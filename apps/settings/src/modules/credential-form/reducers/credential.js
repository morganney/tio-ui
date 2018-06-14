import {
    GET_CREDENTIAL_SUCCESS,
    GET_CREDENTIAL_ERROR,
    SET_CREDENTIAL
} from '../actions/types';

const credential = (state = {}, action) => {
    switch (action.type) {
        case SET_CREDENTIAL:
        case GET_CREDENTIAL_SUCCESS:
            return action.payload || {};
        case GET_CREDENTIAL_ERROR:
        default:
            return state;
    }
};

export {
    credential
};
