import { STANDARD_API_ACTION } from 'tio-alloy';

import {
    IMAGES_REQUEST,
    IMAGES_SUCCESS,
    IMAGES_ERROR
} from './types';

import { IMAGES_BASE_API } from '../constants';

const fetchImages = (filters = {}) => {
    let url = IMAGES_BASE_API;
    const defaultLimit = 50;
    const { offset, limit } = filters;

    filters.offset = offset || 0;
    filters.limit = limit || defaultLimit;

    const preparedFilters = Object.keys(filters).reduce((accumulatedFilters, key) => {
        const value = filters[key];

        if (value || value === 0) {
            accumulatedFilters.push(`${key}=${value}`);
        }

        return accumulatedFilters;
    }, []);

    url += `?${preparedFilters.join('&')}`;

    return {
        type: STANDARD_API_ACTION,
        meta: {
            types: [
                IMAGES_REQUEST,
                IMAGES_SUCCESS,
                IMAGES_ERROR
            ],
            request: url,
            shouldFetch: () => {
                return true;
            }
        }
    };
};

export {
    fetchImages
};
