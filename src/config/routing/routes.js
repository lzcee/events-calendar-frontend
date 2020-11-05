import pages from '../../pages';
import { HOME_PATH, LOGIN_PATH } from './paths';

const PAGE_HOME = {
	component: pages.Home,
	path: HOME_PATH,
	isPrivate: true
}

const PAGE_LOGIN = {
	component: pages.Login,
	path: LOGIN_PATH,
	isPrivate: false
}

const routes = [PAGE_HOME, PAGE_LOGIN];

export default routes;