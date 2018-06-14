import { STANDARD_API_ACTION } from 'tio-alloy';

import {
    POLICIES_REQUEST,
    POLICIES_SUCCESS,
    POLICIES_ERROR
} from './types';

const fetchPolicies = (pagingOptions = {}) => {
    let url = `/container-security/api/v2/policies`;
    let offset = 0;
    let limit = 50;

    if (pagingOptions.offset) {
        offset = pagingOptions.offset;
    }

    if (pagingOptions.limit) {
        limit = pagingOptions.limit;
    }

    url = `${url}?offset=${offset}&limit=${limit}`;

    return {
        type: STANDARD_API_ACTION,
        meta: {
            types: [
                POLICIES_REQUEST,
                POLICIES_SUCCESS,
                POLICIES_ERROR
            ],
            request: url
        }
    };
};

export {
    fetchPolicies
};
