import {
    editPolicy,
    fetchPolicies,
    toggleEditPolicyPlane,
    setNotificationState
} from '../';
import { BRANCH_NAME, STEM_NAME } from '../../constants';

const editPolicyAndDoPostRender = (policyId = null, payload = {}) => {
    // This is a thunk
    return (dispatch, getState) => {
        (async () => {
            await dispatch(editPolicy(policyId, payload));
            const policiesState = getState()[BRANCH_NAME][STEM_NAME];
            const { success } = policiesState.policyEdited;

            if (success) {
                await dispatch(fetchPolicies());
                dispatch(toggleEditPolicyPlane('closed'));
                dispatch(setNotificationState({
                    type: 'success',
                    messageKey: 'editPolicySuccess'
                }));
            } else {
                dispatch(setNotificationState({
                    type: 'error',
                    messageKey: 'editPolicyFailure'
                }));
            }
        })();
    };
};

export {
    editPolicyAndDoPostRender
};
