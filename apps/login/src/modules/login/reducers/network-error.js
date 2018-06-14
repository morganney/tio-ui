import { LOCATION_CHANGE } from 'react-router-redux';
import { actionTypes } from 'redux-form';

import { Locale } from 'tio-alloy';

import { LOG_IN_ERROR } from '../actions/log-in-error';
import { LOG_IN_SUCCESS } from '../actions/log-in-success';

const LOCALE_CHANGE = Locale.actions.types.LOCALE_CHANGE;
const defaultState = {
    network: ''
};

const networkError = (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.FOCUS: {
            const next = {
                network: ''
            };

            return { ...state, ...next };
        }
        case LOG_IN_ERROR:
            return { ...state, network: action.error };
        case LOG_IN_SUCCESS:
            return { ...state, network: '' };
        case LOCATION_CHANGE:
        case LOCALE_CHANGE:
            return defaultState;
        default:
            return state;
    }
};

export default networkError;
