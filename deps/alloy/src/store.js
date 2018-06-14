import { combineReducers, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import { createStore } from 'redux-dynamic-reducer';
import { routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createHashHistory';
import thunk from 'redux-thunk';
import { reducer as formReducer } from 'redux-form';

import { middlewares } from './middlewares';
import locale from './locale';

let eventBus = null;
const defaultState = {};
const sliceHasBeenMounted = [];
const history = createHistory();
const middleware = [thunk, ...middlewares, routerMiddleware(history)];
let composeEnhancers = compose;

// load dev tools middleware
if (ENV === 'development') {
    if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
        composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
    } else {
        middleware.push(createLogger());
    }
}

const store = createStore(
    combineReducers({
        ...locale.reducer,
        form: formReducer
    }),
    defaultState,
    composeEnhancers(applyMiddleware(...middleware))
);

export default {
    configure: (options) => {
        const { Bus } = options;

        if (Bus) {
            eventBus = Bus;
        }
    },
    mount: (slice) => {
        if (!slice.name || sliceHasBeenMounted.indexOf(slice.name) >= 0) {
            return;
        }

        store.attachReducers(slice.reducers);
        sliceHasBeenMounted.push(slice.name);
        eventBus.emit('sliceMounted', slice.name);
    },
    getSlices: () => {
        return sliceHasBeenMounted;
    },
    getStore: () => {
        return store;
    },
    getState: () => {
        return store.getState();
    },
    getHistory: () => {
        return history;
    },
    dispatch: (action) => {
        return store.dispatch(action);
    },
    subscribe: (callback) => {
        return store.subscribe(callback);
    }
};
