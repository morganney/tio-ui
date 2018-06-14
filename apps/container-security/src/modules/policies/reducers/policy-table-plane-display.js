import { TOGGLE_POLICY_TABLE_PLANE } from '../actions/types';

const policyTablePlaneDisplay = (state = 'closed', action) => {
    switch (action.type) {
        case TOGGLE_POLICY_TABLE_PLANE:
            return action.payload;
        default:
            return state;
    }
};

export {
    policyTablePlaneDisplay
};
