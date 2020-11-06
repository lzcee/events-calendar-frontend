import { useState } from 'react';
import { Link } from 'react-router-dom';
import { REGISTER_PATH } from '../../config/routing/paths';

import { ReactComponent as Logo } from '../../assets/icons/logo.svg';

import './style.css';

const LoginForm = () => {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    return (
        <section className="loginFormSection">
            <div className="logo">
                <Logo/>
            </div>
            <div className="formWrapper">
                <h2 className="title">Entrar</h2>
                <form className="form" method="post">
                    <input className="form-field" type="text" name="email" id="email" value={email || ''} placeholder="Email" aria-label="Email" required onChange={ e => setEmail(e.target.value) }/>
                    <input className="form-field" type="password" name="password" id="password" placeholder="Senha" aria-label="Senha" required onChange={ e => setPassword(e.target.value) }/>
                    <input className="btnSubmit" type="submit" value="Entrar"/>
                    <p className="message">{message}</p>
                </form>
				<div className="registerNow">
					<p className="title">Não tem uma conta? <Link className="link" to={{ pathname: REGISTER_PATH }}>Cadastre-se</Link></p>
				</div>
            </div>
        </section>
    )
}

export default LoginForm;