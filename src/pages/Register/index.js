import FormBox from '../../components/FormBox';

import { ReactComponent as Logo } from '../../assets/icons/logo.svg';

import './style.css';

const Register = () => {
	return (
		<div className="register">
			<Logo className="logo"/>
			<FormBox type="register" title="Cadastrar" />
		</div>
	)
}

export default Register;