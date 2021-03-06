import FormBox from '../../components/FormBox';

import { ReactComponent as Logo } from '../../assets/icons/logo.svg';

import './style.css';

const Login = () => {
	return (
		<div className="login">
			<Logo className="logo"/>
			<FormBox type="login" title="Entrar" />
		</div>
	)
}

export default Login;