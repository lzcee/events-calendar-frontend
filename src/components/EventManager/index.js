import { useState } from 'react';
import { useHistory, useLocation } from "react-router-dom";
import api from '../../config/services/api';
import { EVENT_PATH } from '../../config/routing/paths';

import Flatpickr from 'react-flatpickr';

import 'flatpickr/dist/themes/dark.css';
import './style.css';

const EventManager = ({ event, user }) => {

	const history = useHistory();
	const location = useLocation();
	const type = location.state ? location.state.type : 'view';
	const title = location.state ? location.state.title : 'Evento';

	var currentDate = new Date(localStorage.getItem('@App:selectedDate'));

	const [description, setDescription] = useState(event ? event.description : '');
	const [startTime, setStartTime] = useState(currentDate.getTime() / 1000)
	const [endTime, setEndTime] = useState(currentDate.getTime() / 1000)
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

		if (type === 'create') {
			if (validateDate(startTime, endTime)) {
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
			}
			else {
				setMessage("Verifique os campos!")
			}
		}

	};

	const handleBtnHistory = () => {
		history.goBack();
	};

	return (
		<section className={`eventManager ${type}`}>
			<div className="topBar">
				<button className="btnGoBack" onClick={handleBtnHistory} aria-label="Voltar"></button>
				<h2 className="title">{title}</h2>
			</div>
			<form className="form" method="post" onSubmit={(event) => handleSubmit(event)}>
				<input className="form-field" type="text" name="description" id="description" placeholder="Descrição" aria-label="Descrição" required onChange={e => setDescription(e.target.value)} />
				<p className="field-text">Início</p>
				<Flatpickr
					className="startTime"
					options={{
						enableTime: true,
						noCalendar: true,
						defaultHour: currentDate.getHours(),
						defaultMinute: currentDate.getMinutes(),
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
						defaultHour: currentDate.getHours(),
						defaultMinute: currentDate.getMinutes(),
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