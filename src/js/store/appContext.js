import React, { useState, useEffect } from "react";
import getState from "./flux.js";


export const Context = React.createContext(null);

const injectContext = PassedComponent => {
	const StoreWrapper = props => {
		//this will be passed as the contenxt value
		const [state, setState] = useState(
			getState({
				getStore: () => state.store,
				getActions: () => state.actions,
				setStore: updatedStore =>
					setState({
						store: Object.assign(state.store, updatedStore),
						actions: { ...state.actions }
					})
			})
		);


		// State for user login
        const [isLoggedIn, setIsLoggedIn] = useState(false);
        const [user, setUser] = useState(null);

		// Functions for login management
        const logIn = (userData) => {
            setIsLoggedIn(true);
            setUser(userData);
        };

		const logOut = () => {
            setIsLoggedIn(false);
            setUser(null);
        };

		useEffect(() => {
		}, []);


		return (
			<Context.Provider value={{ ...state, isLoggedIn, user, logIn, logOut }}>
				<PassedComponent {...props} />
			</Context.Provider>
		);
	};
	return StoreWrapper;
};

export default injectContext;