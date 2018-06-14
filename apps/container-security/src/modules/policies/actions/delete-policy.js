import { STANDARD_API_ACTION } from 'tio-alloy';

import {
    DELETE_POLICY_REQUEST,
    DELETE_POLICY_SUCCESS,
    DELETE_POLICY_ERROR
} from './types';

const deletePolicy = (policyId = null) => {
    const url = `/container-security/api/v2/policies/${policyId}`;

    return {
        type: STANDARD_API_ACTION,
        meta: {
            types: [
                DELETE_POLICY_REQUEST,
                DELETE_POLICY_SUCCESS,
                DELETE_POLICY_ERROR
            ],
            request: {
                url,
                method: 'DELETE',
                ignoreResponseBody: true
            }
        }
    };
};

export {
    deletePolicy
};
