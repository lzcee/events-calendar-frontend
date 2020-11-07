import Flatpickr from 'react-flatpickr';
import { Portuguese } from "flatpickr/dist/l10n/pt.js"
import { useState } from 'react';
import EventCard from '../EventCard';

import 'flatpickr/dist/themes/dark.css';
import './style.css';

const eventsDefault = [
	{
		"id" : "1",
		"title" : "Event Title",
		"startTime" : "10:00:00",
		"endTime" : "12:00:00"
	},
	{
		"id" : "2",
		"title" : "Event Title 2",
		"startTime" : "14:00:00",
		"endTime" : "14:30:00"
	}
]

const EventsList = () => {
	const [date, setDate] = useState(new Date());
	const [events, setEvents] = useState(eventsDefault);
	
	const eventsList = events.map(event => {
		return <EventCard key={event.id} {...event} />
	});

	return (
		<section className="eventsList">
			<div className="calendar">
				<Flatpickr
					value={date}
					options={{ dateFormat: "d \\de M" , inline: true, locale: Portuguese }}
					onChange={e => setDate(e)}
				/>
			</div>
			<ul className="list">
				{ eventsList }
			</ul>
		</section>
	)
}

export default EventsList;