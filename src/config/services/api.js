import axios from 'axios';

const api = axios.create({
	baseURL: 'http://localhost:3333/'
});

const users = {
	register(payload) {
		return api.post('/users', payload);
	},
	login(payload) {
		return api.get('/users', { auth: { username: payload.email, password: payload.password } });
	}
};

const events = {
	listByDay(payload) {
		return api.get(`/events?startTime=${payload.startTime}&endTime=${payload.endTime}`, { headers: { 'x-access-token': payload.token, 'owner-user': payload.ownerUser } });
	},
	create(payload) {
		return api.post('/events', payload.event, { headers: { 'x-access-token': payload.token } });
	},
	delete(payload) { console.log(payload)
		return api.delete(`/events/${payload.id}`, { data: { ownerUser: payload.ownerUser } , headers: { 'x-access-token': payload.token } });
	}
}

export default {
	users,
	events
}