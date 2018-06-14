import { TOGGLE_NEW_POLICY_PLANE } from '../actions/types';

const newPolicyPlaneDisplay = (state = 'closed', action) => {
    switch (action.type) {
        case TOGGLE_NEW_POLICY_PLANE:
            return action.payload;
        default:
            return state;
    }
};

export {
    newPolicyPlaneDisplay
};
