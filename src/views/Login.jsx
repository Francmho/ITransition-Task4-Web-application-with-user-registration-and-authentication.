import React, { useState, useContext } from 'react';
import { Context } from '../js/store/appContext.js';
import { useNavigate } from 'react-router-dom'; 

const Login = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate(); 

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async () => {
    const { email, password } = formData;
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
    <div>
      <h2>Login</h2>
      <form>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
      </form>
      <button onClick={handleLogin}>Login</button>
      {store.loginError && <h4>{store.loginError}</h4>}
    </div>
  );
};

export default Login;
