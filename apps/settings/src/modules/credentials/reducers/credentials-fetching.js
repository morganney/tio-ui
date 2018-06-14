import {
    GET_CREDENTIALS_REQUEST,
    GET_CREDENTIALS_SUCCESS,
    GET_CREDENTIALS_ERROR,
    DELETE_CREDENTIAL_REQUEST,
    DELETE_CREDENTIAL_SUCCESS,
    DELETE_CREDENTIAL_ERROR
} from '../actions/types';
import {
    CREATE_CREDENTIAL_REQUEST,
    CREATE_CREDENTIAL_SUCCESS,
    CREATE_CREDENTIAL_ERROR
} from '../../credential-form/actions/types';

const credentialsFetching = (state = false, action) => {
    switch (action.type) {
        case GET_CREDENTIALS_REQUEST:
        case CREATE_CREDENTIAL_REQUEST:
        case DELETE_CREDENTIAL_REQUEST:
            return true;
        case GET_CREDENTIALS_SUCCESS:
        case GET_CREDENTIALS_ERROR:
        case CREATE_CREDENTIAL_ERROR:
        case CREATE_CREDENTIAL_SUCCESS:
        case DELETE_CREDENTIAL_SUCCESS:
        case DELETE_CREDENTIAL_ERROR:
            return false;
        default:
            return state;
    }
};

export {
    credentialsFetching
};
