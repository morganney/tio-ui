import * as reducers from './reducers/index';
import login from './modules/login';
import passwordReset from './modules/password-reset';
import newPassword from './modules/new-password';

export default [
    {
        reducer: reducers
    },
    {
        branch: login.constants.BRANCH_NAME,
        reducer: login.reducer
    },
    {
        branch: passwordReset.constants.BRANCH_NAME,
        reducer: passwordReset.reducer
    },
    {
        branch: newPassword.constants.BRANCH_NAME,
        reducer: newPassword.reducer
    }
];
