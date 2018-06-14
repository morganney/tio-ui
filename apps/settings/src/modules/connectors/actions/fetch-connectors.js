import { STANDARD_API_ACTION, Utils } from 'tio-alloy';

import {
    GET_CONNECTORS_REQUEST,
    GET_CONNECTORS_SUCCESS,
    GET_CONNECTORS_ERROR
} from './types';

const connectorsProcessor = (response) => {
    if (response.connectors) {
        response.items = response.connectors.map((connector) => {
            return {
                name: connector.name,
                type: connector.type,
                status: connector.status,
                date_created: Utils.dateFormat(connector.date_created),
                last_connection: Utils.dateFormat(connector.last_sync_time)
            };
        });

        delete response.connectors;
    }

    return response;
};

const fetchConnectors = () => {
    const url = '/settings/connectors';

    return {
        type: STANDARD_API_ACTION,
        meta: {
            types: [
                GET_CONNECTORS_REQUEST,
                GET_CONNECTORS_SUCCESS,
                GET_CONNECTORS_ERROR
            ],
            processResponseBeforeDispatch: connectorsProcessor,
            request: url
        }
    };
};

export {
    fetchConnectors
};
