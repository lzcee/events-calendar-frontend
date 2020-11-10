import { useContext } from 'react';
import UserContext from '../../config/contexts/auth';
import { useLocation } from "react-router-dom";

import Header from '../../components/Header';
import ModalConfirmDelete from '../../components/ModalConfirmDelete';


const DeleteEvent = () => {

	const location = useLocation();

	const { logout, user } = useContext(UserContext);
	const event = location.state.event;

	return (
		<div className="event">
			<Header name={user.name} logout={logout} />
			<ModalConfirmDelete {...event}/>
		</div>
	)
}

export default DeleteEvent;