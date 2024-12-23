import React, { useContext } from 'react';
import { useForm } from 'react-hook-form'; // Importing React Hook Form
import { yupResolver } from '@hookform/resolvers/yup'; // Importing yup resolver
import * as yup from 'yup'; // Yup for schema validation
import { Context } from '../js/store/appContext.js';



// Validation Schema
const schema = yup.object({
    name: yup.string().required('Nombre es obligatorio').min(3, 'Nombre debe tener al menos 3 caracteres'),
    email: yup.string().email('Correo electrónico no válido').required('Email es obligatorio'),
    password: yup.string().required('Contraseña es obligatoria').min(6, 'Contraseña debe tener al menos 6 caracteres'),
  }).required();

const Register = () => {
    const { store, actions } = useContext(Context)

      // Use React Hook Form for form management and validation
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema), // Applying schema validation
    });

    const handleRegister = (data) => {
        const { name, email, password } = data;
        console.log("Registering user", name, email)
        actions.registers(name, email, password);
      }; 

    return (
      <div className="container">
          {store.registerStatus && <h4 className="text-success alert alert-success">Registro Exitoso</h4>}

          <form onSubmit={handleSubmit(handleRegister)}>
          {/* Name Field */}
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Nombre</label>
            <input
              type="text"
              id="name"
              name="name"
              className={`form-control ${errors.name ? 'is-invalid' : ''}`}
              {...register('name')} // Registering input with React Hook Form
            />
            {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
          </div>

          {/* Email Field */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              {...register('email')} // Registering input with React Hook Form
            />
            {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
          </div>

          {/* Password Field */}
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
              {...register('password')} // Registering input with React Hook Form
            />
            {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
          </div>

          <button type="submit" className="btn btn-primary">Registrar</button>
        </form>
          {/* <button onClick={handleRegister}>Register</button> */}
      </div>
  )};

export default Register;