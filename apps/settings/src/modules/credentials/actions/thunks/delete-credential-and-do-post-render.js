import { deleteCredential, fetchCredentials, setNotificationState } from '../';
import { BRANCH_NAME, STEM_NAME } from '../../constants';

const deleteCredentialAndDoPostRender = (uuid) => {
    return async (dispatch, getState) => {
        await dispatch(deleteCredential(uuid));
        const { success, response } = getState()[BRANCH_NAME][STEM_NAME].credentialCrudAction;

        if (success) {
            await dispatch(fetchCredentials());
            dispatch(setNotificationState({
                status: 'low',
                message: 'Credential successfully deleted.'
            }));
        } else {
            dispatch(setNotificationState({
                status: 'critical',
                message: response.message || 'Credential failed to be deleted.'
            }));
        }
    };
};

export {
    deleteCredentialAndDoPostRender
};
