import { PASSWORD_RESET_REQUEST } from '../actions/password-reset-request';
import { PASSWORD_RESET_SUCCESS } from '../actions/password-reset-success';
import { PASSWORD_RESET_ERROR } from '../actions/password-reset-error';

const fetching = (state = false, action) => {
    switch (action.type) {
        case PASSWORD_RESET_REQUEST:
            return true;
        case PASSWORD_RESET_SUCCESS:
        case PASSWORD_RESET_ERROR:
            return false;
        default:
            return state;
    }
};

export default fetching;
