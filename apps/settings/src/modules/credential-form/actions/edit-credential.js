import { STANDARD_API_ACTION } from 'tio-alloy';

import {
    EDIT_CREDENTIAL_REQUEST,
    EDIT_CREDENTIAL_SUCCESS,
    EDIT_CREDENTIAL_ERROR
} from './types';

const editCredential = (uuid, payload = {}) => {
    const url = `/credentials/${uuid}`;

    return {
        type: STANDARD_API_ACTION,
        meta: {
            types: [
                EDIT_CREDENTIAL_REQUEST,
                EDIT_CREDENTIAL_SUCCESS,
                EDIT_CREDENTIAL_ERROR
            ],
            request: {
                url,
                method: 'PUT',
                body: JSON.stringify(payload)
            }
        }
    };
};

export {
    editCredential
};
