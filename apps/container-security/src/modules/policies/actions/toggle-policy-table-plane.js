import { TOGGLE_POLICY_TABLE_PLANE } from './types';

const togglePolicyTablePlane = (displayType = 'closed') => {
    return {
        type: TOGGLE_POLICY_TABLE_PLANE,
        payload: displayType
    };
};

export {
    togglePolicyTablePlane
};
