import axios from 'axios';

const api = axios.create({
	baseURL: 'http://localhost:3333/'
});

const users = {
	userRegister(payload) {
		return api.post('/users', payload);
	}
};

export default {
	users
}