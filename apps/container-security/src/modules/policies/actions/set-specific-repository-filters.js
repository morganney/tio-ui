import { SET_SPECIFIC_REPOSITORY_FILTERS } from './types';

const setSpecificRepositoryFilters = (filters = null) => {
    return {
        type: SET_SPECIFIC_REPOSITORY_FILTERS,
        payload: filters
    };
};

export {
    setSpecificRepositoryFilters
};
