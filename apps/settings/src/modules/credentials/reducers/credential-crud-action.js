import { DELETE_CREDENTIAL_REQUEST, DELETE_CREDENTIAL_SUCCESS, DELETE_CREDENTIAL_ERROR } from '../actions/types';
import * as credentialFormActions from '../../credential-form/actions';

const {
    CREATE_CREDENTIAL_REQUEST,
    CREATE_CREDENTIAL_SUCCESS,
    CREATE_CREDENTIAL_ERROR,
    EDIT_CREDENTIAL_REQUEST,
    EDIT_CREDENTIAL_SUCCESS,
    EDIT_CREDENTIAL_ERROR
} = credentialFormActions.types;

const credentialCrudAction = (state = {}, action) => {
    const response = {
        action: action.type,
        running: false
    };

    switch (action.type) {
        case CREATE_CREDENTIAL_REQUEST:
        case EDIT_CREDENTIAL_REQUEST:
        case DELETE_CREDENTIAL_REQUEST:
            return {
                ...response,
                running: true
            };
        case CREATE_CREDENTIAL_SUCCESS:
        case EDIT_CREDENTIAL_SUCCESS:
        case DELETE_CREDENTIAL_SUCCESS:
            return {
                ...response,
                success: true,
                response: action.payload
            };
        case CREATE_CREDENTIAL_ERROR:
        case EDIT_CREDENTIAL_ERROR:
        case DELETE_CREDENTIAL_ERROR:
            return {
                ...response,
                success: false,
                response: JSON.parse(action.payload.message)
            };
        default:
            return state;
    }
};

export {
    credentialCrudAction
};
