import EventEmitter from 'eventemitter3';

import Rest from './api';
import Logs from './logging';
import * as Utils from './utils';
import Locale from './locale';
import Store from './store';
import { STANDARD_API_ACTION } from './action-types';
import { Poll } from './poll';

const Bus = new EventEmitter();
const appData = {
    isSetup: false
};

Store.configure({ Bus });

const Alloy = {
    setup: (appOptions = {}) => {
        return new Promise((resolve, reject) => {
            if (appData.isSetup) {
                reject(new Error('Alloy has already been setup'));
            }

            const { rest, logs, name } = appOptions;

            if (rest) {
                Rest.configure(rest);
            }

            if (logs) {
                Logs.configure(logs);
            }

            if (name) {
                appData.name = name;
            }

            appData.isSetup = true;

            resolve();
        });
    },
    RENDER_TO: document.getElementById('main-app')
};

export default {
    Alloy,
    Bus,
    Rest,
    Logs,
    Utils,
    Locale,
    Store,
    STANDARD_API_ACTION,
    Poll
};
