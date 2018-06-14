import { NEW_PASSWORD_REQUEST } from '../actions/new-password-request';
import { NEW_PASSWORD_SUCCESS } from '../actions/new-password-success';
import { NEW_PASSWORD_ERROR } from '../actions/new-password-error';

const fetching = (state = false, action) => {
    switch (action.type) {
        case NEW_PASSWORD_REQUEST:
            return true;
        case NEW_PASSWORD_SUCCESS:
        case NEW_PASSWORD_ERROR:
            return false;
        default:
            return state;
    }
};

export default fetching;
