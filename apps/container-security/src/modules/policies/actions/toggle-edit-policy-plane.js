import { TOGGLE_EDIT_POLICY_PLANE } from './types';

const toggleEditPolicyPlane = (displayType = 'closed') => {
    return {
        type: TOGGLE_EDIT_POLICY_PLANE,
        payload: displayType
    };
};

export {
    toggleEditPolicyPlane
};
