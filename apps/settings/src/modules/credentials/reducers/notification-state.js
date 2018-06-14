import { SET_NOTIFICATION_STATE } from '../actions/types';

const notificationState = (state = {}, action) => {
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
