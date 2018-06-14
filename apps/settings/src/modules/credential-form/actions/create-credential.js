import { STANDARD_API_ACTION } from 'tio-alloy';

import {
    CREATE_CREDENTIAL_REQUEST,
    CREATE_CREDENTIAL_SUCCESS,
    CREATE_CREDENTIAL_ERROR
} from './types';

const createCredential = (payload = {}) => {
    const url = '/credentials';

    return {
        type: STANDARD_API_ACTION,
        meta: {
            types: [
                CREATE_CREDENTIAL_REQUEST,
                CREATE_CREDENTIAL_SUCCESS,
                CREATE_CREDENTIAL_ERROR
            ],
            request: {
                url,
                method: 'POST',
                body: JSON.stringify(payload)
            }
        }
    };
};

export {
    createCredential
};
