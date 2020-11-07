import './style.css';

const EventCard = ({ id, title, startTime, endTime }) => {
	return (
		<li key={id} className="eventCard">
			<h3 className="title">{title}</h3>
			<p className="time">{startTime} até {endTime}</p>
		</li>
	)
}

export default EventCard;