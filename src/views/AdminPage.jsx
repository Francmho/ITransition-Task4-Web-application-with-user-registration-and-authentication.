import React, { useContext } from "react";
import { Context } from "../js/store/appContext";
import User from "../components/User.jsx";

const AdminPage = () => {
  const { actions } = useContext(Context); // Obtenemos el store y las acciones desde Flux

  
  const handleSearch = (e) => {
    const query = e.target.value;
    actions.searchUser(query); // Filtrado en tiempo real
  };


  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg bg-light mb-3">
        <div className="container-fluid">
          <div className="navbar-nav">
          <button className="btn btn-sm btn-outline-secondary m-1" onClick={actions.blockSelectedUsers}>
            Block <i className="fas fa-lock"></i>
          </button>

          <button className="btn btn-sm btn-outline-primary m-1" onClick={actions.unblockSelectedUsers}>
          <i className="fas fa-lock-open"></i>
          </button>

          <button className="btn btn-sm btn-outline-danger m-1" onClick={actions.deleteSelectedUsers}>
          <i className="fas fa-trash"></i>
          </button>
          </div>

          <form className="d-flex ms-auto" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search users"
              aria-label="Search"
              onChange={handleSearch} // Filtrado en tiempo real
            />
          </form>
        </div>
      </nav>
     
      <User/>

    </div>
  );
};

export default AdminPage;



// import React, { useContext } from "react";
// import { Context } from "../js/store/appContext.js"; // Asegúrate de que el path sea correcto
// import User from "../components/User.jsx"

// const AdminPage = () => {
//   const { actions } = useContext(Context); // Extraer las acciones de Flux

//   // Manejo de eventos
//   const handleBlockUser = () => {
//     const userId = prompt("Enter user ID to block:"); // Obtener ID del usuario de alguna forma
//     if (userId) {
//       actions.blockUser(userId); // Llamar a la acción de Flux
//     }
//   };

//   const handleUnblockUser = () => {
//     const userId = prompt("Enter user ID to unblock:");
//     if (userId) {
//       actions.unblockUser(userId); // Llamar a la acción de Flux
//     }
//   };

//   const handleDeleteUser = () => {
//     const userId = prompt("Enter user ID to delete:");
//     if (userId) {
//       actions.deleteUser(userId); // Llamar a la acción de Flux
//     }
//   };

//   const handleSearch = (e) => {
//     const query = e.target.value;
//     actions.searchUser(query); // Llamar a la acción de búsqueda mientras se escribe
//   };

//   return (
//     <nav className="navbar navbar-expand-lg bg-light">
//       <div className="container-fluid">
//         <div className="navbar-nav">
//           {/* Botón 1: Bloquear usuario */}
//           <button className="btn btn-outline-secondary me-2" onClick={handleBlockUser}>
//             <i className="bi bi-lock"></i> Block
//           </button>

//           {/* Botón 2: Desbloquear usuario */}
//           <button className="btn btn-outline-primary me-2" onClick={handleUnblockUser}>
//             <i className="bi bi-unlock"></i> Unblock
//           </button>

//           {/* Botón 3: Eliminar usuario */}
//           <button className="btn btn-outline-danger" onClick={handleDeleteUser}>
//             <i className="bi bi-trash"></i> Delete
//           </button>
//         </div>

//         {/* Campo de búsqueda */}
//         <form className="d-flex ms-auto" role="search">
//           <input
//             className="form-control me-2"
//             type="search"
//             placeholder="Search users"
//             aria-label="Search"
//             onChange={handleSearch} // Cada vez que se escribe, ejecuta la búsqueda
//           />
//           <button className="btn btn-outline-success" type="submit">Search</button>
//         </form>
//         <User/>
//       </div>
//     </nav>
//   );
// };

// export default AdminPage;

