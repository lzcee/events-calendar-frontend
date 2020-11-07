import { ReactComponent as Logo } from '../../assets/icons/logo.svg';
import { ReactComponent as Logout } from '../../assets/icons/logout.svg';

import './style.css';

const Header = ({ name }) => {
	return (
		<header className="header">
			<Logo className="logo" />
			<p className="hello">Olá, {name}!</p>
			<button className="logout">
				<Logout />
			</button>
		</header >
	)
}

export default Header;