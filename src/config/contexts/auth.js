import { createContext, useState } from 'react';

import { HOME_PATH, LOGIN_PATH } from '../routing/paths';

const UserContext = createContext();

export const UserProvider = ({ children }) => {

	const [user, setUser] = useState({});

	const login = (name, id, token, history) => {

		localStorage.setItem("@App:token", token);
		localStorage.setItem("@App:id", id);

		setUser((user) => ({
			name,
			id,
			token,
			auth: true
		}));

		history.push({ pathname: HOME_PATH });
	};

	const logout = () => {

		localStorage.removeItem("@App:token");
		localStorage.removeItem("@App:id");

		setUser((user) => ({
			name: '',
			id: '',
			token: '',
			auth: false
		}));
	};

	return (
		<UserContext.Provider value={{ user, login, logout }}>
			{children}
		</UserContext.Provider>
	);
};

export default UserContext;