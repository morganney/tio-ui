import { STANDARD_API_ACTION } from 'tio-alloy';

import {
    CONTAINER_IMAGES_REQUEST,
    CONTAINER_IMAGES_SUCCESS,
    CONTAINER_IMAGES_ERROR
} from './types';

const fetchContainerImages = (repositoryName = null, filters = {}) => {
    let url = `/container-security/api/v2/images`;
    let offset = 0;
    let limit = 50;

    if (filters.offset) {
        offset = filters.offset;
    }

    if (filters.limit) {
        limit = filters.limit;
    }

    url = `${url}?repo=${repositoryName}&offset=${offset}&limit=${limit}`;

    return {
        type: STANDARD_API_ACTION,
        meta: {
            types: [
                CONTAINER_IMAGES_REQUEST,
                CONTAINER_IMAGES_SUCCESS,
                CONTAINER_IMAGES_ERROR
            ],
            request: url
        }
    };
};

export {
    fetchContainerImages
};
