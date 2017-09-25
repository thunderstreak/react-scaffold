import IndexComponent from '../components/index';
import AboutComponent from '../components/About';
import HomeComponent from '../components/home';
import JoinComponent from '../components/Join';

// 根路由
const routes = {
	childRoutes: [{
		path: '/',
		component: IndexComponent,
		childRoutes: [
			AboutComponent,
			HomeComponent,
            JoinComponent,
		]
	}]
}

export default routes;
