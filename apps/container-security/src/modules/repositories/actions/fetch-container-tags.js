import { STANDARD_API_ACTION } from 'tio-alloy';

import {
    CONTAINER_TAGS_REQUEST,
    CONTAINER_TAGS_SUCCESS,
    CONTAINER_TAGS_ERROR
} from './types';

const fetchContainerTags = (repoName = null, imageName = null, filters = {}) => {
    let url = `/container-security/api/v2/images`;
    let offset = 0;
    let limit = 50;

    if (filters.offset) {
        offset = filters.offset;
    }

    if (filters.limit) {
        limit = filters.limit;
    }

    url = `${url}?repo=${repoName}&name=${imageName}&offset=${offset}&limit=${limit}`;

    return {
        type: STANDARD_API_ACTION,
        meta: {
            types: [
                CONTAINER_TAGS_REQUEST,
                CONTAINER_TAGS_SUCCESS,
                CONTAINER_TAGS_ERROR
            ],
            request: url
        }
    };
};

export {
    fetchContainerTags
};
