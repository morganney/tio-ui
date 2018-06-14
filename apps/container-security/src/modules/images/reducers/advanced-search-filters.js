import { SET_ADVANCED_SEARCH_FILTERS } from '../actions/types';

const initialState = {
    apiFilters: {},
    componentFilters: []
};

const advancedSearchFilters = (state = initialState, action) => {
    switch (action.type) {
        case SET_ADVANCED_SEARCH_FILTERS: {
            // Default provided, so an empty call resets filters to initialState
            return action.payload || initialState;
        }
        default:
            return state;
    }
};

export {
    advancedSearchFilters
};
