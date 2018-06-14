import { SET_SEARCH_TERMS } from '../actions/types';

const repositorySearch = (state = '', action) => {
    switch (action.type) {
        case SET_SEARCH_TERMS: {
            return action.payload.search;
        }
        default:
            return state;
    }
};

export {
    repositorySearch
};
