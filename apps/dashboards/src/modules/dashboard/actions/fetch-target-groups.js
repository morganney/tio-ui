import { STANDARD_API_ACTION } from 'tio-alloy';

import {
    TARGET_GROUPS_REQUEST,
    TARGET_GROUPS_SUCCESS,
    TARGET_GROUPS_ERROR
} from './types';

const fetchTargetGroups = () => {
    return {
        type: STANDARD_API_ACTION,
        meta: {
            types: [
                TARGET_GROUPS_REQUEST,
                TARGET_GROUPS_SUCCESS,
                TARGET_GROUPS_ERROR
            ],
            request: '/target-groups/all'
        }
    };
};

export { fetchTargetGroups };
