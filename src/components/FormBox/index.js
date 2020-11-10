import { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { REGISTER_PATH } from '../../config/routing/paths';

import api from '../../config/services/api';
import UserContext from '../../config/contexts/auth';

import './style.css';

const FormBox = ({ type, title }) => {

	const { login } = useContext(UserContext);
	const history = useHistory();

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [message, setMessage] = useState("");

	const validateEmail = (email) => {
		var regex = /^[\w-s.]+@([\w-]+.)+[\w-]{2,4}$/;
		return regex.test(String(email).toLowerCase());
	};

	const validatePassword = (password) => {
		return password !== "" ? true : false;
	};

	const validateName = (name) => {
		return name !== "" ? true : false;
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		if (type === 'register' && validateName(name) && validateEmail(email) && validatePassword(password)) {
			const data = {
				name,
				email,
				password
			}
			setMessage("");
			api.users.register(data)
				.then((response) => {
					login(response.data.user.name, response.data.user.id, response.data.token, history)
				})
				.catch((err) => {
					setMessage("Ops! Não foi possível concluir o cadastro, tente novamente!")
				});
		}
		else if (type === 'login' && validateEmail(email) && validatePassword(password)) {
			const data = {
				email,
				password
			}
			setMessage("");
			api.users.login(data)
				.then((response) => {
					login(response.data.user.name, response.data.user.id, response.data.token, history)
				})
				.catch((err) => {
					setMessage("Ops! E-mail/senha incorretos, tente novamente!")
				});
		}
		else {
			setMessage("Ops! Verifique os campos antes de enviar!")
		}
	}

	return (
		<div className="formBox">
			<h2 className="title">{title}</h2>
			<form className="form" method="post" onSubmit={(event) => handleSubmit(event)}>
				{type === 'register' &&
					<input className="form-field" type="text" name="name" id="name" placeholder="Nome" aria-label="Email" required onChange={e => setName(e.target.value)} />
				}
				<input className="form-field" type="email" name="email" id="email" placeholder="E-mail" aria-label="E-mail" required onChange={e => setEmail(e.target.value)} />
				<input className="form-field" type="password" name="password" id="password" placeholder="Senha" aria-label="Senha" required onChange={e => setPassword(e.target.value)} />
				<input className="btnSubmit" type="submit" value={title} />
				<p className="message">{message}</p>
			</form>
			{ type === 'login' &&
				<div className="registerNow">
					<p className="title">Não tem uma conta? <Link className="link" to={{ pathname: REGISTER_PATH }}>Cadastre-se</Link></p>
				</div>
			}
		</div>
	)
}

export default FormBox;