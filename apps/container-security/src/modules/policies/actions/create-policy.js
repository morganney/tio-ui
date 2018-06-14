import { STANDARD_API_ACTION } from 'tio-alloy';

import {
    CREATE_POLICY_REQUEST,
    CREATE_POLICY_SUCCESS,
    CREATE_POLICY_ERROR
} from './types';

const createPolicy = (payload = {}) => {
    const url = `/container-security/api/v2/policies`;

    return {
        type: STANDARD_API_ACTION,
        meta: {
            types: [
                CREATE_POLICY_REQUEST,
                CREATE_POLICY_SUCCESS,
                CREATE_POLICY_ERROR
            ],
            request: {
                url,
                method: 'POST',
                body: JSON.stringify(payload),
                ignoreResponseBody: true
            }
        }
    };
};

export {
    createPolicy
};
