import { STANDARD_API_ACTION } from 'tio-alloy';

import {
    TEST_CONNECTOR_REQUEST,
    TEST_CONNECTOR_SUCCESS,
    TEST_CONNECTOR_ERROR
} from './types';

const testConnector = (importId) => {
    const url = `/container-security/api/v2/imports/${importId}/test`;

    return {
        type: STANDARD_API_ACTION,
        meta: {
            types: [
                TEST_CONNECTOR_REQUEST,
                TEST_CONNECTOR_SUCCESS,
                TEST_CONNECTOR_ERROR
            ],
            request: {
                url,
                method: 'POST'
            }
        }
    };
};

export {
    testConnector
};
