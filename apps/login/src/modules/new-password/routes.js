import NewPassword from './components/containers/new-password';

const routes = [{
    props: {
        exact: true,
        path: '/password-reset/:key'
    },
    component: NewPassword
}];

export default routes;
