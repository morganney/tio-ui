import {
    REPOSITORIES_SUCCESS,
    REPOSITORIES_ERROR
} from '../actions/types';

const repositoriesError = (state = false, action) => {
    switch (action.type) {
        case REPOSITORIES_SUCCESS:
            return false;
        case REPOSITORIES_ERROR:
            return 'genericApiError';
        default:
            return state;
    }
};

export {
    repositoriesError
};
