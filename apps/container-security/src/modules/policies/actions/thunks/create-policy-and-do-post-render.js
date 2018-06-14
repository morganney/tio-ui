import { Store } from 'tio-alloy';
import { constants as commonConstants } from 'tio-common';
// TODO: refactor this in CST-1763, after CI-21999 is resolved
import { BASE_PATH } from 'tio-container-security/modules/common/constants';
import {
    createPolicy,
    fetchPolicies,
    toggleNewPolicyPlane,
    setNotificationState
} from 'tio-container-security/modules/policies/actions';
import { BRANCH_NAME, STEM_NAME } from 'tio-container-security/modules/policies/constants';

const history = Store.getHistory();

const createPolicyAndDoPostRender = (payload = {}) => {
    return (dispatch, getState) => {
        (async () => {
            await dispatch(createPolicy(payload));
            const policiesState = getState()[BRANCH_NAME][STEM_NAME];
            const { success } = policiesState.policyCreated;

            if (success) {
                await dispatch(fetchPolicies());
                dispatch(toggleNewPolicyPlane('closed'));
                dispatch(setNotificationState({
                    type: 'success',
                    messageKey: 'createPolicySuccess'
                }));
                // TODO: setTimeout is intended as temporary until a more formal routing transition solution is in place.
                setTimeout(() => {
                    history.push(`${BASE_PATH}/dashboard/policies`);
                }, commonConstants.planeTransitionInMs);
            } else {
                dispatch(setNotificationState({
                    type: 'error',
                    messageKey: 'createPolicyFailure'
                }));
            }
        })();
    };
};

export {
    createPolicyAndDoPostRender
};
