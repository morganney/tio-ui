import { STANDARD_API_ACTION } from 'tio-alloy';

import {
    EDIT_POLICY_REQUEST,
    EDIT_POLICY_SUCCESS,
    EDIT_POLICY_ERROR
} from './types';

const editPolicy = (policyId = null, payload = {}) => {
    const url = `/container-security/api/v2/policies/${policyId}`;

    return {
        type: STANDARD_API_ACTION,
        meta: {
            types: [
                EDIT_POLICY_REQUEST,
                EDIT_POLICY_SUCCESS,
                EDIT_POLICY_ERROR
            ],
            request: {
                url,
                method: 'PUT',
                body: JSON.stringify(payload),
                ignoreResponseBody: true
            }
        }
    };
};

export {
    editPolicy
};
