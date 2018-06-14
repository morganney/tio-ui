import { SET_NOTIFICATION_STATE } from '../actions/types';

const initialState = {
    payload: {}
};

const notificationState = (state = initialState, action) => {
    switch (action.type) {
        case SET_NOTIFICATION_STATE:
            return {
                payload: action.payload
            };
        default:
            return state;
    }
};

export {
    notificationState
};
