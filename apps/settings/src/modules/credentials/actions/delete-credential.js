import { STANDARD_API_ACTION } from 'tio-alloy';

import {
    DELETE_CREDENTIAL_REQUEST,
    DELETE_CREDENTIAL_SUCCESS,
    DELETE_CREDENTIAL_ERROR
} from './types';

const deleteCredential = (uuid) => {
    const url = `/credentials/${uuid}`;

    return {
        type: STANDARD_API_ACTION,
        meta: {
            types: [
                DELETE_CREDENTIAL_REQUEST,
                DELETE_CREDENTIAL_SUCCESS,
                DELETE_CREDENTIAL_ERROR
            ],
            request: {
                url,
                method: 'DELETE'
            }
        }
    };
};

export {
    deleteCredential
};
