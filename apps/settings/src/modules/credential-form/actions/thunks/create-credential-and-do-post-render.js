import { push } from 'react-router-redux';

import { createCredential } from '../create-credential';
import { BRANCH_NAME, STEM_NAME } from '../../../credentials/constants';
import { setNotificationState, fetchCredentials } from '../../../credentials/actions';

const createCredentialAndDoPostRender = (payload = {}) => {
    return async (dispatch, getState) => {
        await dispatch(createCredential(payload));
        const { success, response } = getState()[BRANCH_NAME][STEM_NAME].credentialCrudAction;

        if (success) {
            await dispatch(fetchCredentials());
            dispatch(setNotificationState({
                status: 'low',
                message: 'Credential successfully created.'
            }));

            dispatch(push('/settings/credentials'));
        } else {
            dispatch(setNotificationState({
                status: 'critical',
                message: response.message || 'Credential failed to be created.'
            }));
        }
    };
};

export {
    createCredentialAndDoPostRender
};
