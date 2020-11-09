import { useHistory } from 'react-router-dom';
import { EVENT_PATH } from '../../config/routing/paths';

import './style.css';

const AddEventButton = () => {

	const history = useHistory();

	const handleClick = () => {
		history.push({ pathname: EVENT_PATH, state: { type: 'create', title: 'Criar Evento' } });
	}

	return (
		<button className="addEventButton" aria-label="Adicionar Evento" onClick={handleClick}></button>
	);
}

export default AddEventButton;