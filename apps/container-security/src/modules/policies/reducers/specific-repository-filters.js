import { SET_SPECIFIC_REPOSITORY_FILTERS } from '../actions/types';

const initialState = null;
const specificRepositoryFilters = (state = initialState, action) => {
    switch (action.type) {
        case SET_SPECIFIC_REPOSITORY_FILTERS:
            return action.payload;
        default:
            return state;
    }
};

export {
    specificRepositoryFilters
};
