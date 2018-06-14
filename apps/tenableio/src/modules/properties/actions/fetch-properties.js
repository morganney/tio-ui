import { STANDARD_API_ACTION } from 'tio-alloy';

import {
    PROPERTIES_REQUEST,
    PROPERTIES_SUCCESS,
    PROPERTIES_ERROR
} from './types';

const fetchProperties = () => {
    return {
        type: STANDARD_API_ACTION,
        meta: {
            types: [
                PROPERTIES_REQUEST,
                PROPERTIES_SUCCESS,
                PROPERTIES_ERROR
            ],
            request: '/server/properties'
        }
    };
};

export {
    fetchProperties
};
