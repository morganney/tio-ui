import { SET_NOTIFICATION_STATE } from '../actions/types';

const initialState = {};
const notificationState = (state = initialState, action) => {
    switch (action.type) {
        case SET_NOTIFICATION_STATE:
            return action.payload;
        default:
            return state;
    }
};

export {
    notificationState
};
