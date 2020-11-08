import EventsList from '../../components/EventsList';
import Header from '../../components/Header';
import AddEventButton from '../../components/AddEventButton';

import './style.css';

const Home = () => {

	return (
		<div className="home">
			<Header name="Fulano" />
			<EventsList />
			<AddEventButton />
		</div>
	)
}

export default Home;