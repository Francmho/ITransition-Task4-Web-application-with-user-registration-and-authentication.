import React, { useContext } from 'react';
import { Context } from '../js/store/appContext.js';
import { useNavigate } from 'react-router-dom'; 
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';


// Define schema for validation using Yup
const schema = yup.object({
  email: yup.string().email('Correo electrónico inválido').required('El correo electrónico es obligatorio'),
  password: yup.string().min(6, 'La contraseña debe tener al menos 6 caracteres').required('La contraseña es obligatoria'),
}).required();

const Login = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate(); 

  // Use useForm with Yup validation
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });


  const handleLogin = async (data) => {
    const { email, password } = data;
    try {
        const userData = await actions.login(email, password);
        if (userData) {
          // Si el login es exitoso, redirigir a /contact
          navigate('/adminpage');
        }
      } catch (error) {
        console.error("Error de login:", error);
      }
  };

  return (
    <div className="alert alert-light m-5 p-5">
      <h1 className="mb-4 d-flex align-center lg-col-8">Login</h1>
      {/* Form with Bootstrap classes and react-hook-form integration */}
      <form onSubmit={handleSubmit(handleLogin)}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            {...register('email')}  // Registering input with react-hook-form
          />
          {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
            {...register('password')}  // Registering input with react-hook-form
          />
          {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
        </div>

        <button type="submit" className="btn btn-primary">Login</button>
      </form>

      {/* Display error if login fails */}
      {store.loginError && <div className="alert alert-danger mt-3">{store.loginError}</div>}
    </div>
  );
};

export default Login;
