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

export default {
	users
}