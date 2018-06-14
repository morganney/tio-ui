import { LOCATION_CHANGE } from 'react-router-redux';

import { VALIDATION_ERROR } from '../actions/validation-error';
import { FOCUS_FORM_FIELD } from '../actions/focus-form-field';
import { NEW_PASSWORD_ERROR } from '../actions/new-password-error';
import { NEW_PASSWORD_SUCCESS } from '../actions/new-password-success';

const defaultState = {
    validation: {},
    network: ''
};

const errors = (state = defaultState, action) => {
    switch (action.type) {
        case VALIDATION_ERROR:
            return { ...state, validation: action.error };
        case FOCUS_FORM_FIELD: {
            const next = {
                validation: {
                    ...state.validation,
                    [action.payload]: false
                },
                network: ''
            };

            return { ...state, ...next };
        }
        case NEW_PASSWORD_ERROR:
            return { ...state, network: action.error };
        case NEW_PASSWORD_SUCCESS:
            return { ...state, network: '' };
        case LOCATION_CHANGE:
            return defaultState;
        default:
            return state;
    }
};

export default errors;
