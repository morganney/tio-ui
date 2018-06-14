import { STANDARD_API_ACTION } from 'tio-alloy';

import {
    RUN_CONNECTOR_REQUEST,
    RUN_CONNECTOR_SUCCESS,
    RUN_CONNECTOR_ERROR
} from './types';

const runConnector = (importId) => {
    const url = `/container-security/api/v2/imports/${importId}/run`;

    return {
        type: STANDARD_API_ACTION,
        meta: {
            types: [
                RUN_CONNECTOR_REQUEST,
                RUN_CONNECTOR_SUCCESS,
                RUN_CONNECTOR_ERROR
            ],
            request: {
                url,
                method: 'POST',
                ignoreResponseBody: true
            }
        }
    };
};

export {
    runConnector
};
