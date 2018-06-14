import {
    deletePolicy,
    fetchPolicies,
    toggleEditPolicyPlane,
    setNotificationState
} from '../';
import { BRANCH_NAME, STEM_NAME } from '../../constants';

const deletePolicyAndDoPostRender = (policyId = null) => {
    // This is a thunk
    return (dispatch, getState) => {
        (async () => {
            await dispatch(deletePolicy(policyId));
            const policiesState = getState()[BRANCH_NAME][STEM_NAME];
            const { success } = policiesState.policyDeleted;

            if (success) {
                await dispatch(fetchPolicies());
                dispatch(toggleEditPolicyPlane('closed'));
                dispatch(setNotificationState({
                    type: 'success',
                    messageKey: 'deletePolicySuccess'
                }));
            } else {
                dispatch(setNotificationState({
                    type: 'error',
                    messageKey: 'deletePolicyFailure'
                }));
            }
        })();
    };
};

export {
    deletePolicyAndDoPostRender
};
