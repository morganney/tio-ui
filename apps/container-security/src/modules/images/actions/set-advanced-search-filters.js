import { SET_ADVANCED_SEARCH_FILTERS } from './types';

const setAdvancedSearchFilters = (payload) => {
    return {
        type: SET_ADVANCED_SEARCH_FILTERS,
        payload
    };
};
export {
    setAdvancedSearchFilters
};
