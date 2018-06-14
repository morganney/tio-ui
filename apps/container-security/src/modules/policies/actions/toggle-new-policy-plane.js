import { TOGGLE_NEW_POLICY_PLANE } from './types';

const toggleNewPolicyPlane = (displayType = 'closed') => {
    return {
        type: TOGGLE_NEW_POLICY_PLANE,
        payload: displayType
    };
};

export {
    toggleNewPolicyPlane
};
