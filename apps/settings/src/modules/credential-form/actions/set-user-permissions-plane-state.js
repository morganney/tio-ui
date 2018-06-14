import { SET_USER_PERMISSIONS_PLANE_STATE } from './types';

const setUserPermissionsPlaneState = (state) => {
    return {
        type: SET_USER_PERMISSIONS_PLANE_STATE,
        payload: state
    };
};

export {
    setUserPermissionsPlaneState
};
