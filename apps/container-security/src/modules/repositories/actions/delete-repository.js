import { STANDARD_API_ACTION } from 'tio-alloy';

import {
    DELETE_REPOSITORY_REQUEST,
    DELETE_REPOSITORY_SUCCESS,
    DELETE_REPOSITORY_ERROR
} from './types';

const deleteRepository = (repositoryName = null) => {
    const url = `/container-security/api/v2/repositories/${repositoryName}`;

    return {
        type: STANDARD_API_ACTION,
        meta: {
            types: [
                DELETE_REPOSITORY_REQUEST,
                DELETE_REPOSITORY_SUCCESS,
                DELETE_REPOSITORY_ERROR
            ],
            request: {
                url,
                method: 'DELETE',
                ignoreResponseBody: true
            }
        }
    };
};

export {
    deleteRepository
};
