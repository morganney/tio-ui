import { STANDARD_API_ACTION } from 'tio-alloy';

import {
    IMAGE_INVENTORY_REQUEST,
    IMAGE_INVENTORY_SUCCESS,
    IMAGE_INVENTORY_ERROR
} from './types';

import { INVENTORY_BASE_API } from '../constants';

const fetchImageInventory = (imageDigest = null) => {
    let url = INVENTORY_BASE_API;

    url += `/${imageDigest}`;

    return {
        type: STANDARD_API_ACTION,
        meta: {
            types: [
                IMAGE_INVENTORY_REQUEST,
                IMAGE_INVENTORY_SUCCESS,
                IMAGE_INVENTORY_ERROR
            ],
            request: url,
            shouldFetch: () => {
                return true;
            }
        }
    };
};

export {
    fetchImageInventory
};
