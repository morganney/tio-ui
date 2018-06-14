import { STANDARD_API_ACTION } from 'tio-alloy';

import {
    GET_CREDENTIALS_FILTERS_REQUEST,
    GET_CREDENTIALS_FILTERS_SUCCESS,
    GET_CREDENTIALS_FILTERS_ERROR
} from './types';

const fetchCredentialsFilters = () => {
    const url = '/filters/credentials';

    return {
        type: STANDARD_API_ACTION,
        meta: {
            types: [
                GET_CREDENTIALS_FILTERS_REQUEST,
                GET_CREDENTIALS_FILTERS_SUCCESS,
                GET_CREDENTIALS_FILTERS_ERROR
            ],
            request: url
        }
    };
};

export {
    fetchCredentialsFilters
};
