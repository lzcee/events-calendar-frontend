import EventsList from '../../components/EventsList';
import Header from '../../components/Header';

import './style.css';

const Home = () => {
	return (
		<div className="home">
			<Header name="Fulano" />
			<EventsList />
		</div>
	)
}

export default Home;