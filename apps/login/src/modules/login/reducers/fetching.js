import { LOG_IN_REQUEST } from '../actions/log-in-request';
import { LOG_IN_SUCCESS } from '../actions/log-in-success';
import { LOG_IN_ERROR } from '../actions/log-in-error';

const fetching = (state = false, action) => {
    switch (action.type) {
        case LOG_IN_REQUEST:
            return true;
        case LOG_IN_SUCCESS:
        case LOG_IN_ERROR:
            return false;
        default:
            return state;
    }
};

export default fetching;
