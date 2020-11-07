import './style.css';

const EventCard = ({ title, startTime, endTime }) => {
	return (
		<li className="eventCard">
			<h3 className="title">{title}</h3>
			<p className="time">{startTime} até {endTime}</p>
		</li>
	)
}

export default EventCard;