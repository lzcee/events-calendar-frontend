import { Portuguese } from "flatpickr/dist/l10n/pt.js"
import { useState, useEffect } from 'react';
import api from '../../config/services/api';

import Flatpickr from 'react-flatpickr';
import EventCard from '../EventCard';

import 'flatpickr/dist/themes/dark.css';
import './style.css';

const EventsList = ({ id, token }) => {

	const [date, setDate] = useState(new Date());
	const [events, setEvents] = useState([]);

	const payload = {
		startTime: Math.floor(new Date(date.setHours(0, 0, 0, 0)).getTime() / 1000),
		endTime: Math.floor(new Date(date.setHours(23, 59, 59, 999)).getTime() / 1000),
		ownerUser: id,
		token: token
	}

	useEffect(() => {

		api.events.listByDay(payload)
			.then(response => {
				setEvents(response.data.events)
			})
			.catch(err => {
				console.log(err)
			})

	},[date])

	const eventsList = events.map(event => {
		return <EventCard key={event.id} {...event} />
	});

	return (
		<section className="eventsList">
			<div className="calendar">
				<Flatpickr
					value={date}
					options={{ dateFormat: "d \\de M", inline: true, locale: Portuguese }}
					onChange={e => setDate(e[0])}
				/>
			</div>
			<ul className="list">
				{eventsList}
			</ul>
		</section>
	)
}

export default EventsList;