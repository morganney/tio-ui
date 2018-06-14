import { STANDARD_API_ACTION } from 'tio-alloy';

import {
    REPOSITORIES_REQUEST,
    REPOSITORIES_SUCCESS,
    REPOSITORIES_ERROR
} from './types';

const fetchRepositories = (filters = {}) => {
    let url = `/container-security/api/v2/repositories`;
    let offset = 0;
    let limit = 50;

    if (filters.offset) {
        offset = filters.offset;
    }

    if (filters.limit) {
        limit = filters.limit;
    }

    url = `${url}?offset=${offset}&limit=${limit}`;

    if (filters.repositorySearch) {
        url += `&nameContains=${filters.repositorySearch}`;
    }

    return {
        type: STANDARD_API_ACTION,
        meta: {
            types: [
                REPOSITORIES_REQUEST,
                REPOSITORIES_SUCCESS,
                REPOSITORIES_ERROR
            ],
            request: url
        }
    };
};

export {
    fetchRepositories
};
