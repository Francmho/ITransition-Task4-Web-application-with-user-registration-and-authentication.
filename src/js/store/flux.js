const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			personas: ["Pedro", "Maria"],
			registerStatus: false
		},
		actions: {

			exampleFunction: () => {
				console.log("hola")
				return
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