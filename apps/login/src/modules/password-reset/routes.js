import PasswordReset from './components/containers/password-reset';

const routes = [{
    props: {
        exact: true,
        path: '/password-reset'
    },
    component: PasswordReset
}];

export default routes;
