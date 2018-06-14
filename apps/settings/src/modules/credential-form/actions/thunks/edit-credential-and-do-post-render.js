import { push } from 'react-router-redux';

import { editCredential } from '../edit-credential';
import { BRANCH_NAME, STEM_NAME } from '../../../credentials/constants';
import { setNotificationState, fetchCredentials } from '../../../credentials/actions';

const editCredentialAndDoPostRender = (uuid, payload = {}) => {
    return async (dispatch, getState) => {
        await dispatch(editCredential(uuid, payload));
        const { success, response } = getState()[BRANCH_NAME][STEM_NAME].credentialCrudAction;

        if (success) {
            await dispatch(fetchCredentials());
            dispatch(setNotificationState({
                status: 'low',
                message: 'Credential successfully editted.'
            }));

            dispatch(push('/settings/credentials'));
        } else {
            dispatch(setNotificationState({
                status: 'critical',
                message: response.message || 'Credential failed to be editted.'
            }));
        }
    };
};

export {
    editCredentialAndDoPostRender
};
