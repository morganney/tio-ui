import { TOGGLE_REPOSITORY_TABLE_PLANE } from '../actions/types';

const repositoryTablePlaneDisplay = (state = 'closed', action) => {
    switch (action.type) {
        case TOGGLE_REPOSITORY_TABLE_PLANE:
            return action.payload;
        default:
            return state;
    }
};

export {
    repositoryTablePlaneDisplay
};
