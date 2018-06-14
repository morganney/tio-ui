import { TOGGLE_EDIT_POLICY_PLANE } from '../actions/types';

const editPolicyPlaneDisplay = (state = 'closed', action) => {
    switch (action.type) {
        case TOGGLE_EDIT_POLICY_PLANE:
            return action.payload;
        default:
            return state;
    }
};

export {
    editPolicyPlaneDisplay
};
