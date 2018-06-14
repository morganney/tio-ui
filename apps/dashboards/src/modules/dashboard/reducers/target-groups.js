import { TARGET_GROUPS_SUCCESS } from '../actions/types';

const targetGroups = (state = [], action) => {
    switch (action.type) {
        case TARGET_GROUPS_SUCCESS:
            return action.payload.target_groups;
        default:
            return state;
    }
};

export { targetGroups };
