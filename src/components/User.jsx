import React, { useContext, useState } from "react";
import { Context } from "../js/store/appContext";
//import { Sparklines, SparklinesLine } from 'react-sparklines'; // Gráfica minimalista

const User = () => {
  const { store, actions } = useContext(Context); // Asumiendo que tienes los usuarios en el store
  const [selectAll, setSelectAll] = useState(false); // Estado para manejar el checkbox de "seleccionar todos"


    // Función para convertir el isoDate de last_login a un formato legible
    const timeAgo = (isoDate) => {
      const seconds = Math.floor((new Date() - new Date(isoDate)) / 1000);
      const units = [
        { label: "month", divisor: 60 * 60 * 24 * 30 },
        { label: "day", divisor: 60 * 60 * 24 },
        { label: "hour", divisor: 60 * 60 },
        { label: "minute", divisor: 60 }
      ];
    
      for (let unit of units) {
        const value = Math.floor(seconds / unit.divisor);
        if (value >= 1) return `${value} ${unit.label}${value > 1 ? "s" : ""} ago`;
      }
      return "less than a minute ago";
    };

    // Función unificada para calcular el progreso y obtener el color de la barra
const calculateProgressAndColor = (isoDate, maxTimeInMonths = 3) => {
  const now = new Date();
  const timeDifference = now - new Date(isoDate);

  // Calculamos el tiempo máximo en milisegundos (maxTimeInMonths es el valor flexible de los meses)
  const maxTime = maxTimeInMonths * 30 * 24 * 60 * 60 * 1000; // Tiempo máximo en milisegundos

  // Cálculo de progreso: 0% es el tiempo máximo y 100% es el tiempo mínimo (hace menos de un minuto)
  const progress = Math.max(0, Math.min(100, (1 - (timeDifference / maxTime)) * 100)); 

  // Determinamos el color de la barra basado en el progreso
  let color;
  if (progress === 0) color = "gray"; 
  else if (progress <= 20) color = "black"; 
  else if (progress <= 40) color = "red"; 
  else if (progress <= 60) color = "orange"; 
  else if (progress <= 80) color = "yellow"; 
  else color = "green"; // Verde para el progreso superior al 80%

  return { progress, color };
};


  // Maneja la selección o deselección de todos los usuarios
  const toggleSelectAll = () => {
    setSelectAll(!selectAll);
    actions.selectAllUsers(!selectAll); // Accion para seleccionar o deseleccionar todos los usuarios
  };

   // Maneja la selección individual de un usuario
   const handleSelectUser = (userId) => {
    const isSelected = store.users.find(user => user.id === userId).checked;
    actions.selectUsers([userId], !isSelected); // Cambia el estado de un solo usuario
  };
  

  return (
    <div className="container">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">
              <input 
              type="checkbox" 
              checked={selectAll}
              onChange={toggleSelectAll} //AdminPage.jsx
              /> 
            </th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Last Seen</th>
          </tr>
        </thead>
        <tbody>
          {store.users.map((user) => (
            <tr key={user.id}>
              <td>
                <input 
                type="checkbox" 
                checked={user.checked} 
                onChange={() => handleSelectUser(user.id)} // Selecciona o deselecciona un solo usuario
                />
              </td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <div>
                  <small>{timeAgo(user.last_login)}</small>
                </div>
                <div className="progress" style={{ height: "5px" }}>
                  <div
                    className="progress-bar"
                    role="progressbar"
                    style={{ 
                      width: `${calculateProgressAndColor(user.last_login).progress}%`, // Calcula el progreso en base a los meses
                      backgroundColor: calculateProgressAndColor(user.last_login).color // Determina el color
                    }}
                    aria-valuenow={calculateProgressAndColor(user.last_login).progress}
                    aria-valuemin="0"
                    aria-valuemax="100"
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default User;
