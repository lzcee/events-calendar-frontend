import { useState } from 'react';
import { Link } from 'react-router-dom';
import { EVENT_PATH, EVENT_DELETE_PATH } from '../../config/routing/paths';

import './style.css';

const EventCard = ({ description, startTime, endTime, id }) => {

	const startHour = new Date(startTime * 1000).getHours();
	const startMinutes = new Date(startTime * 1000).getMinutes() === 0 ? '00' : new Date(startTime * 1000).getMinutes();

	const endHour = new Date(endTime * 1000).getHours();
	const endMinutes = new Date(endTime * 1000).getMinutes() === 0 ? '00' : new Date(endTime * 1000).getMinutes();

	const start =  startHour + ':' + startMinutes;
	const end =  endHour + ':' + endMinutes;

	const event = {
		id,
		description,
		startTime,
		endTime
	}

	return (
		<li className="eventCard">
			<h3 className="title">{description}</h3>
			<p className="time">{start} até {end}</p>
			<div className="btnWrapper">
				<Link className="btn" to={{ pathname: EVENT_PATH, state: { type: 'update', title: 'Editar Evento', event } }}>
					Editar
				</Link>
				<Link className="btn" to={{ pathname: EVENT_DELETE_PATH, state: { event } }}>
					Excluir
				</Link>
			</div>
		</li>
	)
}

export default EventCard;