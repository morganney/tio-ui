import {
    GET_TIMEZONES_SUCCESS,
    GET_TIMEZONES_ERROR
} from '../actions';

const timezones = (state = [], action) => {
    switch (action.type) {
        case GET_TIMEZONES_SUCCESS:
            return action.payload.timezones;
        case GET_TIMEZONES_ERROR:
            return state;
        default:
            return state;
    }
};

export {
    timezones
};
