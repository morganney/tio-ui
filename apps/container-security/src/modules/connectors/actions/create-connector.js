import { STANDARD_API_ACTION } from 'tio-alloy';

import {
    CREATE_CONNECTOR_REQUEST,
    CREATE_CONNECTOR_SUCCESS,
    CREATE_CONNECTOR_ERROR
} from './types';

const createConnector = (payload = {}) => {
    const url = `/container-security/api/v2/imports`;

    return {
        type: STANDARD_API_ACTION,
        meta: {
            types: [
                CREATE_CONNECTOR_REQUEST,
                CREATE_CONNECTOR_SUCCESS,
                CREATE_CONNECTOR_ERROR
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
    createConnector
};
