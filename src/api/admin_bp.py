from flask import request, jsonify, Blueprint
from flask.views import MethodView
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from models import User
from database import db
from datetime import timedelta, datetime

admin_bp = Blueprint('admin', __name__)
bcrypt = Bcrypt()
jwt = JWTManager()

class Register(MethodView):
    def post(self):
        # Ruta para registrar usuario
        email = request.json.get('email')
        password = request.json.get('password')
        name = request.json.get('name')
        if not email or not password or not name:
            return jsonify({'error': 'Email, password and Name are required.'}), 400

        existing_user = User.query.filter_by(email=email).first()
        if existing_user:
            return jsonify({'error': 'Email already exists.'}), 409

        password_hash = bcrypt.generate_password_hash(password).decode('utf-8')
        new_user = User(email=email, password=password_hash, name=name)
        db.session.add(new_user)
        db.session.commit()

        return jsonify({'message': 'User created successfully.'}), 201

class Login(MethodView):
    def post(self):
        # Ruta para obtener token
        email = request.json.get('email')
        password = request.json.get('password')
        if not email or not password:
            return jsonify({'error': 'Email and password are required.'}), 400
        
        login_user = User.query.filter_by(email=email).one()
        if bcrypt.check_password_hash(login_user.password, password):
            expires = timedelta(minutes=30)
            access_token = create_access_token(identity=login_user.id, expires_delta=expires)
            return jsonify({'access_token': access_token}), 200
        else:
            return jsonify({"error": "Invalid password."}), 401

class AdminUsers(MethodView):
    @jwt_required()
    def get(self):
        # Ruta restringida para obtener usuarios admin
        current_user_id = get_jwt_identity()
        if current_user_id:
            users = User.query.all()
            user_list = [{'id': user.id, 'username': user.name, 'email': user.email, 'is_blocked': user.is_blocked} for user in users]
            return jsonify(user_list), 200
        else:
            return jsonify({"error": "Invalid or missing token."}), 401
        

class BlockUnblockUser(MethodView):
    @jwt_required()
    def post(self):
        # Ruta para bloquear o desbloquear usuarios
        current_user_id = get_jwt_identity()
        if not current_user_id:
            return jsonify({"error": "Invalid or missing token."}), 401

        data = request.get_json()
        if not data or 'users' not in data:
            return jsonify({"error": "Missing users data."}), 400

        user_ids = data['users']
        is_blocked = data.get('is_blocked', True)  # Bloquear por defecto

        # Actualizar usuarios seleccionados
        try:
            User.query.filter(User.id.in_(user_ids)).update({User.is_blocked: is_blocked}, synchronize_session=False)
            db.session.commit()
            return jsonify({"message": "Users updated successfully."}), 200
        except Exception as e:
            db.session.rollback()
            return jsonify({"error": f"Failed to update users: {str(e)}"}), 500

class DeleteUsers(MethodView):
    @jwt_required()
    def delete(self):
        # Verifica que el token es válido y que el usuario está autenticado
        current_user_id = get_jwt_identity()
        if not current_user_id:
            return jsonify({"error": "Invalid or missing token."}), 401

        data = request.get_json()
        if not data or 'users' not in data:
            return jsonify({"error": "Missing users data."}), 400

        user_ids = data['users']

        # Verifica que la lista de IDs no esté vacía
        if not user_ids or len(user_ids) == 0:
            return jsonify({"error": "No users selected for deletion."}), 400

        # Intenta eliminar los usuarios seleccionados
        try:
            users_to_delete = User.query.filter(User.id.in_(user_ids)).all()

            if not users_to_delete:
                return jsonify({"error": "No matching users found."}), 404

            for user in users_to_delete:
                db.session.delete(user)

            db.session.commit()

            return jsonify({"message": f"Deleted {len(users_to_delete)} users successfully."}), 200
        except Exception as e:
            db.session.rollback()
            return jsonify({"error": f"Failed to delete users: {str(e)}"}), 500


# Register the views

admin_bp.add_url_rule('/register', view_func=Register.as_view('register'))
admin_bp.add_url_rule('/login', view_func=Login.as_view('login'))
admin_bp.add_url_rule('/users', view_func=AdminUsers.as_view('admin_users'))
admin_bp.add_url_rule('/users/block-unblock', view_func=BlockUnblockUser.as_view('block_unblock_user'))
admin_bp.add_url_rule('/delete-users', view_func=DeleteUsers.as_view('delete_users'))

