import React, { Component } from 'react';
import { Provider } from 'react-intl-redux';
import { ConnectedRouter } from 'react-router-redux';

import { Store, Utils } from 'tio-alloy';

import routes from './routes';
import Login from './login';
import reducers from './reducers.js';
import { logInSuccess } from './modules/login/actions';

const token = Utils.storage.get('Iron.token');
const combinedReducers = Utils.processReducerTrees(reducers);

Store.mount({
    name: 'login',
    reducers: combinedReducers
});

if (token) {
    Store.dispatch(logInSuccess(token));
}

class LoginApp extends Component {
    render () {
        return (
            <Provider store={Store.getStore()}>
                <ConnectedRouter history={Store.getHistory()}>
                    <Login routes={routes} />
                </ConnectedRouter>
            </Provider>
        );
    }
}

export default LoginApp;
