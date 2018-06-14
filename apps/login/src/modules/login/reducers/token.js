import { LOG_IN_SUCCESS } from '../actions/log-in-success';

const token = (state = '', action) => {
    switch (action.type) {
        case LOG_IN_SUCCESS:
            return action.payload;
        default:
            return state;
    }
};

export default token;
