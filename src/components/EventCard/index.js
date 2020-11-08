import './style.css';

const EventCard = ({ description, startTime, endTime, id }) => {

	const startHour = new Date(startTime*1000).getHours() + ':' + new Date(startTime*1000).getMinutes();
	const endHour = new Date(endTime*1000).getHours() + ':' + new Date(endTime*1000).getMinutes();

	return (
		<li className="eventCard">
			<h3 className="title">{description}</h3>
			<p className="time">{startHour} até {endHour}</p>
		</li>
	)
}

export default EventCard;