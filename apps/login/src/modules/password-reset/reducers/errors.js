import { LOCATION_CHANGE } from 'react-router-redux';

import { VALIDATION_ERROR } from '../actions/validation-error';
import { FOCUS_FORM_FIELD } from '../actions/focus-form-field';
import { PASSWORD_RESET_ERROR } from '../actions/password-reset-error';
import { PASSWORD_RESET_SUCCESS } from '../actions/password-reset-success';

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
        case PASSWORD_RESET_ERROR:
            return { ...state, network: action.error };
        case PASSWORD_RESET_SUCCESS:
            return { ...state, network: '' };
        case LOCATION_CHANGE:
            return defaultState;
        default:
            return state;
    }
};

export default errors;
