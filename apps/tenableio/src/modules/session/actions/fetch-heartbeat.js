import { STANDARD_API_ACTION } from 'tio-alloy';

import {
    HEARTBEAT_REQUEST,
    HEARTBEAT_SUCCESS,
    HEARTBEAT_ERROR
} from './types';

const fetchHeartBeat = () => {
    return {
        type: STANDARD_API_ACTION,
        meta: {
            types: [
                HEARTBEAT_REQUEST,
                HEARTBEAT_SUCCESS,
                HEARTBEAT_ERROR
            ],
            request: '/server/heartbeat'
        }
    };
};

export {
    fetchHeartBeat
};
