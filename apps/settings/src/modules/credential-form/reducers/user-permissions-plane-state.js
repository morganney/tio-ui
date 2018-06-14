import { SET_USER_PERMISSIONS_PLANE_STATE } from '../actions/types';

const userPermissionsPlaneState = (state = 'closed', action) => {
    switch (action.type) {
        case SET_USER_PERMISSIONS_PLANE_STATE:
            return action.payload;
        default:
            return state;
    }
};

export {
    userPermissionsPlaneState
};
