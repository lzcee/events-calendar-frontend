import { useState } from 'react';
import { useHistory, useLocation } from "react-router-dom";
import api from '../../config/services/api';
import { EVENT_PATH, HOME_PATH } from '../../config/routing/paths';

import Flatpickr from 'react-flatpickr';

import 'flatpickr/dist/themes/dark.css';
import './style.css';

const EventManager = ({ event, user }) => {

	const history = useHistory();
	const location = useLocation();
	const type = location.state ? location.state.type : 'view';
	const title = location.state ? location.state.title : 'Evento';

	var currentDate = new Date(localStorage.getItem('@App:selectedDate'));
	var defaultDescription = event ? event.description : location.state.event ? location.state.event.description : '';
	var defaultStart = location.state.event ? new Date(location.state.event.startTime * 1000) : null;
	var defaultEnd = location.state.event ? new Date(location.state.event.endTime * 1000) : null;
	var startHour = defaultStart ? defaultStart.getHours() : currentDate.getHours();
	var startMinutes = defaultStart ? defaultStart.getMinutes() : currentDate.getMinutes();
	var endHour = defaultEnd ? defaultEnd.getHours() : currentDate.getHours();
	var endMinutes = defaultEnd ? defaultEnd.getMinutes() : currentDate.getMinutes();
	
	const [description, setDescription] = useState(defaultDescription);
	const [startTime, setStartTime] = useState(defaultStart ? defaultStart.getTime() / 1000 : currentDate.getTime() / 1000)
	const [endTime, setEndTime] = useState(defaultEnd ? defaultEnd.getTime() / 1000 : currentDate.getTime() / 1000)
	const [message, setMessage] = useState("");

	const toTimestamp = (date) => {
		const hours = date.getHours();
		const minutes = date.getMinutes();

		return Math.floor(new Date(currentDate.setHours(hours, minutes, 0, 0)).getTime() / 1000);
	}

	const validateDate = (startTime, endTime) => {
		return startTime !== '' && endTime !== '' ? startTime < endTime ? true : false : false;
	}

	const handleSubmit = (event) => {
		event.preventDefault();

		if (validateDate(startTime, endTime)) {
			if (type === 'create') {
				const payload = {
					token: user.token,
					event: {
						description,
						startTime,
						endTime,
						ownerUser: user.id
					}
				}
				api.events.create(payload)
					.then(response => {
						setMessage("");
						history.push({ pathname: EVENT_PATH, state: { type: 'view', title: 'Evento' } });
					})
					.catch(err => {
						if (err.response.status === 400) {
							setMessage("Já existe um evento ocorrendo nesse período, tente outro.")
						} else {
							setMessage("Ops! Ocorreu um erro, tente novamente.")
						}
					})
			} else if (type === 'update') {
				const payload = {
					token: user.token,
					event: {
						description,
						startTime,
						endTime,
						ownerUser: user.id
					},
					id: event.id
				}
				api.events.update(payload)
					.then(response => {
						setMessage("");
						history.push({ pathname: EVENT_PATH, state: { type: 'view', title: 'Evento' } });
					})
					.catch(err => {
						if (err.response.status === 400) {
							setMessage("Já existe um evento ocorrendo nesse período, tente outro.")
						} else {
							setMessage("Ops! Ocorreu um erro, tente novamente.")
						}
					})
			}
		}
		else {
			setMessage("Verifique os campos!")
		}

	};

	const handleBtnHistory = () => {
		history.push({ pathname: HOME_PATH });
	};

	return (
		<section className={`eventManager ${type}`}>
			<div className="topBar">
				<button className="btnGoBack" onClick={handleBtnHistory} aria-label="Voltar"></button>
				<h2 className="title">{title}</h2>
			</div>
			<form className="form" method="post" onSubmit={(event) => handleSubmit(event)}>
				<input className="form-field" type="text" name="description" id="description" placeholder="Descrição" aria-label="Descrição" value={description} required onChange={e => setDescription(e.target.value)} />
				<p className="field-text">Início</p>
				<Flatpickr
					className="startTime"
					options={{
						enableTime: true,
						noCalendar: true,
						defaultHour: startHour,
						defaultMinute: startMinutes,
						minuteIncrement: 1,
						parseDate: true,
						dateFormat: "H:i",
						time_24hr: true,
						inline: true
					}}
					onChange={e => setStartTime(toTimestamp(e[0]))}
				/>
				<p className="field-text">Fim</p>
				<Flatpickr
					className="endTime"
					options={{
						enableTime: true,
						noCalendar: true,
						defaultHour: endHour,
						defaultMinute: endMinutes,
						minuteIncrement: 1,
						dateFormat: "H:i",
						parseDate: true,
						time_24hr: true,
						inline: true
					}}
					onChange={e => setEndTime(toTimestamp(e[0]))}
				/>
				<input className="btnSubmit" type="submit" value={title} />
				<p className="message">{message}</p>
			</form>
		</section>
	)
}

export default EventManager;