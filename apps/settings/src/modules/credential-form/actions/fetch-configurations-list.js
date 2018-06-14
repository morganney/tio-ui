import { STANDARD_API_ACTION } from 'tio-alloy';

import {
    GET_CONFIGURATIONS_LIST_REQUEST,
    GET_CONFIGURATIONS_LIST_SUCCESS,
    GET_CONFIGURATIONS_LIST_ERROR
} from './types';

const fetchConfigurationsList = () => {
    return {
        type: STANDARD_API_ACTION,
        meta: {
            types: [
                GET_CONFIGURATIONS_LIST_REQUEST,
                GET_CONFIGURATIONS_LIST_SUCCESS,
                GET_CONFIGURATIONS_LIST_ERROR
            ],
            request: '/credentials/types'
        }
    };
};

export {
    fetchConfigurationsList
};
