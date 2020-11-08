import { useContext } from 'react';
import UserContext from '../../config/contexts/auth';

import EventsList from '../../components/EventsList';
import Header from '../../components/Header';
import AddEventButton from '../../components/AddEventButton';

import './style.css';

const Home = () => {

	const { logout, user} = useContext(UserContext);

	return (
		<div className="home">
			<Header name={user.name} logout={logout} />
			<EventsList {...user}/>
			<AddEventButton {...user}/>
		</div>
	)
}

export default Home;