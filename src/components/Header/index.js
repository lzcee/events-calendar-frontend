import { useHistory } from 'react-router-dom';

import { ReactComponent as Logo } from '../../assets/icons/logo.svg';
import { ReactComponent as Logout } from '../../assets/icons/logout.svg';

import './style.css';

const Header = ({ name, logout }) => {

	const history = useHistory();

	const handleClick = () => {
		logout(history);
	}

	return (
		<header className="header">
			<Logo className="logo" />
			<p className="hello">Olá, {name}!</p>
			<button className="logout" onClick={handleClick}>
				<Logout />
			</button>
		</header >
	)
}

export default Header;