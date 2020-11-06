import { useState } from 'react';
import { Link } from 'react-router-dom';
import { REGISTER_PATH } from '../../config/routing/paths';

import './style.css';

const FormBox = ({ type, title }) => {

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [message, setMessage] = useState("");

	return (
		<div className="formBox">
			<h2 className="title">{title}</h2>
			<form className="form" method="post">
				{ type === 'register' &&
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