import React, { useContext, useState, useEffect  } from "react";
import { Context } from "../js/store/appContext";
import { Sparklines, SparklinesLine } from 'react-sparklines'; // Gráfica minimalista

const User = ({ selectAll }) => {
  const { store, actions } = useContext(Context); // Asumiendo que tienes los usuarios en el store
  const [users, setUsers] = useState(store.users || []); 
  
  useEffect(() => {
    setUsers(store.users); // Sincroniza el estado local con el store cuando cambia
  }, [store.users]);
  
  useEffect(() => {
    const updatedUsers = users.map(user => ({
      ...user,
      checked: selectAll, // Actualizamos el estado de cada usuario en función del checkbox global
    }));
    setUsers(updatedUsers);
  }, [selectAll]);

  // const handleSelectUser = (id) => {
  //   const updatedUsers = users.map(user =>
  //     user.id === id ? { ...user, checked: !user.checked } : user
  //   );
  //   setUsers(updatedUsers);
  // };

  updateUsersStore: (updatedUsers) => {
    const store = getStore();
    setStore({ ...store, users: updatedUsers });
  }
  

  const toggleSelectAll = (users) => {
    const updatedUsers = users.map(user => ({ ...user, checked: !selectAll }));
    setUsers(updatedUsers);
    actions.selectAllUsers(!selectAll); // Accion para seleccionar o deseleccionar todos los usuarios
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
            <th scope="col">Last Login</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <input type="checkbox" checked={user.checked} />
              </td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <Sparklines data={user.last_login} limit={5}>
                  <SparklinesLine color="blue" />
                </Sparklines>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default User;
