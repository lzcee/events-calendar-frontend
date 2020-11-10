import { useState, useContext } from 'react';
import { useHistory, Link } from "react-router-dom";
import api from '../../config/services/api';
import { HOME_PATH } from '../../config/routing/paths';
import UserContext from '../../config/contexts/auth';

import './style.css';

const ModalConfirmDelete = ({ id, description }) => {

	const history = useHistory();

	const { user } = useContext(UserContext);
	const [message, setMessage] = useState("");

	const handleClick = () => {
		const payload = {
			token: user.token,
			id: id,
			ownerUser: user.id
		}

		api.events.delete(payload)
			.then(response => {
				setMessage("");
				history.push({ pathname: HOME_PATH });
			})
			.catch(err => {
				setMessage("Ops! Ocorreu um erro, tente novamente.")
			})
	}

	return (
		<div id={id} className="modalWrapper">
			<div className="modal">
				<p className="eventName">Você está prestes a excluir o evento <span>"{description}"</span></p>
				<p className="title">Excluir evento?</p>
				<div className="modalBtnWrapper">
					<Link className="modalBtn" to={{ pathname: HOME_PATH }}>Não</Link>
					<button className="modalBtn" onClick={handleClick}>Sim</button>
				</div>
				<p>{message}</p>
			</div>
		</div>
	);
};

export default ModalConfirmDelete;