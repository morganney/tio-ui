import { STANDARD_API_ACTION } from 'tio-alloy';
import { BRANCH_NAME, STEM_NAME } from 'schedule/constants';

import {
    GET_TIMEZONES_REQUEST,
    GET_TIMEZONES_SUCCESS,
    GET_TIMEZONES_ERROR
} from './types';

const getTimezones = () => {
    return {
        type: STANDARD_API_ACTION,
        meta: {
            request: '/scans/timezones',
            types: [
                GET_TIMEZONES_REQUEST,
                GET_TIMEZONES_SUCCESS,
                GET_TIMEZONES_ERROR
            ],
            shouldFetch (state) {
                return !state[BRANCH_NAME][STEM_NAME].timezones.length;
            }
        }
    };
};

export {
    getTimezones
};
