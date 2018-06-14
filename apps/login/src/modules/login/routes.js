import { LoginContainer as LoginComponent } from './components/containers/login';

const routes = [{
    props: {
        // https://github.com/ReactTraining/react-router/issues/4958
        exact: true,
        path: '/'
    },
    component: LoginComponent
}];

export default routes;
