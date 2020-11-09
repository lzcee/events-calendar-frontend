import { useContext } from 'react';
import UserContext from '../../config/contexts/auth';

import Header from '../../components/Header';
import EventManager from '../../components/EventManager';

import './style.css';

const Event = () => {

	const { logout, user } = useContext(UserContext);

	return (
		<div className="event">
			<Header name={user.name} logout={logout} />
			<EventManager user={user} />
		</div>
	)
}

export default Event;