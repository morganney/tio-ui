import React from 'react';
import { Route } from 'react-router-dom';

import login from './modules/login';
import passwordReset from './modules/password-reset';
import newPassword from './modules/new-password';

export default [
    ...login.routes,
    ...passwordReset.routes,
    ...newPassword.routes
].map((route, idx) => {
    const component = route.component;

    return <Route {...route.props} component={component} key={idx} />;
});
