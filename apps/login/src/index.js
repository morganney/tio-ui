import React from 'react';
import ReactDOM from 'react-dom';

import { Rest } from 'tio-alloy';

import LoginApp from './app';

Rest.configure({
    apiPrefix: 'api/'
});

ReactDOM.render(<LoginApp />, document.getElementById('login'));
