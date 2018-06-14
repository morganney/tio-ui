import {
    REPOSITORIES_REQUEST,
    REPOSITORIES_SUCCESS,
    REPOSITORIES_ERROR
} from '../actions/types';

const repositoriesFetching = (state = false, action) => {
    switch (action.type) {
        case REPOSITORIES_REQUEST:
            return true;
        case REPOSITORIES_SUCCESS:
        case REPOSITORIES_ERROR:
            return false;
        default:
            return state;
    }
};

export {
    repositoriesFetching
};
