import { STANDARD_API_ACTION } from 'tio-alloy';

import {
    GET_CREDENTIAL_REQUEST,
    GET_CREDENTIAL_SUCCESS,
    GET_CREDENTIAL_ERROR
} from './types';

const getCredential = (uuid) => {
    return {
        type: STANDARD_API_ACTION,
        meta: {
            types: [
                GET_CREDENTIAL_REQUEST,
                GET_CREDENTIAL_SUCCESS,
                GET_CREDENTIAL_ERROR
            ],
            request: `/credentials/${uuid}`
        }
    };
};

export {
    getCredential
};
