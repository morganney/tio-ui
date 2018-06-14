import { STANDARD_API_ACTION } from 'tio-alloy';

import {
    ORGANIZATION_STATS_REQUEST,
    ORGANIZATION_STATS_SUCCESS,
    ORGANIZATION_STATS_ERROR
} from './types';

import { ORGANIZATION_STATS_BASE_API } from '../constants';

const statsProcessor = (response) => {
    // Translate osCount to an osData array
    if (response.osCount) {
        response.osData = [];

        for (const key in response.osCount) {
            response.osData.push({
                label: key,
                count: response.osCount[key]
            });
        }

        // Sort the pairs in value-descending order
        response.osData.sort((curr, next) => {
            return next.count - curr.count;
        });

        // Then, remove the osCount prop, so we don't store it
        delete response.osCount;
    }

    return response;
};

const fetchOrganizationStats = () => {
    return {
        type: STANDARD_API_ACTION,
        meta: {
            types: [
                ORGANIZATION_STATS_REQUEST,
                ORGANIZATION_STATS_SUCCESS,
                ORGANIZATION_STATS_ERROR
            ],
            processResponseBeforeDispatch: statsProcessor,
            request: ORGANIZATION_STATS_BASE_API
        }
    };
};

export {
    fetchOrganizationStats
};
