import { TOGGLE_NEW_REPOSITORY_PLANE } from '../actions/types';

const newRepositoryPlaneDisplay = (state = 'closed', action) => {
    switch (action.type) {
        case TOGGLE_NEW_REPOSITORY_PLANE:
            return action.payload;
        default:
            return state;
    }
};

export {
    newRepositoryPlaneDisplay
};
