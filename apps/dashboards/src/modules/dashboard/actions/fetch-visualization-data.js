import { STANDARD_API_ACTION } from 'tio-alloy';

import {
    VISUALIZATION_DATA_REQUEST,
    VISUALIZATION_DATA_SUCCESS,
    VISUALIZATION_DATA_ERROR
} from './types';

const fetchVisualizationData = (uuids = []) => {
    const componentUrlArray = [];

    for (let i = uuids.length; i--;) {
        componentUrlArray.push(`/dashboards/custom/${uuids[i].dashboardUuid}/render/${uuids[i].componentUuid}`);
    }

    return {
        type: STANDARD_API_ACTION,
        meta: {
            types: [
                VISUALIZATION_DATA_REQUEST,
                VISUALIZATION_DATA_SUCCESS,
                VISUALIZATION_DATA_ERROR
            ],
            request: componentUrlArray
        }
    };
};

export { fetchVisualizationData };
