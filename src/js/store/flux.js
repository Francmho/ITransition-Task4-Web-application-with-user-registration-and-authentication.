const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			personas: ["Pedro", "Maria"],
			registerStatus: false,
			selectedUsers:[],
			users: [
				{
				  id: 1,
				  name: "Clare, Alex",
				  email: "a_clare42@gmail.com",
				  lastLogin: [5, 10, 5, 20, 8], // Simulación de datos para la gráfica
				  checked: true,
				},
				{
				  id: 2,
				  name: "Morrison, Jim",
				  email: "dtimer9@dealyaari.com",
				  lastLogin: [2, 15, 10, 4, 7],
				  checked: false,
				},
				{
				  id: 3,
				  name: "Simone, Nina",
				  email: "marishabelin@giftcode-ao.com",
				  lastLogin: [3, 8, 14, 5, 11],
				  checked: true,
				},
				// Más usuarios...
			  ]
		},
		actions: {

			exampleFunction: () => {
				console.log("hola")
				return
			},
			
			updateUsersStore: (updatedUsers) => {
				setStore({ users: updatedUsers });
			  },

			updateSelectAllUsers: (selectAll) => {
				const updatedUsers = getStore().users.map(user => ({
					...user,
					checked: selectAll
				}));
				setStore({ users: updatedUsers });
				},
				
			toggleSelectAll: () => {
				const store = getStore();
				const selectAll = !store.selectAll;  // Cambia el estado de selectAll
				actions.updateSelectAllUsers(selectAll); // Actualiza todos los usuarios
			},

			registers: async(name, email, password) => {
				try {
					console.log("entra en register")
					const data = {
						name: name,
						email: email,
						password: password
					};

					const response = await fetch("https://itransition-task4-web-application-with.onrender.com/admin/users", {
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify(data)
					});

					const statusCode = response.status;
					const responseData = await response.json();
					console.log(responseData)

					if (statusCode === 201) {
						setStore({ ...getStore(), registerStatus: true });
						//
					}
					return responseData


				} catch (error) {
					console.error("Error:", error);
					throw error;
				}
			},

			login: async (email, password) => {
				try {
					console.log("Enters flux-login");
			
					const data = {
						email: email,
						password: password
					};
			
					const response = await fetch("https://itransition-task4-web-application-with.onrender.com/admin/token", {
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify(data)
					});
			
					const statusCode = response.status;
					const responseData = await response.json();
					console.log(responseData);
					
			
					if (statusCode === 200) {
						console.log("Login exitoso, token recibido:", responseData.access_token);

						//localStorage.setItem('access_token', responseData.access_token);
						return responseData;  // Retorna el token para usarlo donde sea necesario
					} else {
						console.log("Error en el login:", responseData.error || "Error desconocido");
					}
			
				} catch (error) {
					console.error("Error durante la autenticación:", error);
					throw error;
				}
			}
			

		}
	};
};

export default getState;

//"https://tutorial-100-pasos-back.onrender.com/admin/users"