import {
    deleteRepository,
    fetchRepositories,
    toggleRepositoryDrilldownPlane,
    setNotificationState
} from '../';
import { BRANCH_NAME, STEM_NAME } from '../../constants';

const deleteRepositoryAndDoPostRender = (repositoryName = null) => {
    // This is a thunk
    return (dispatch, getState) => {
        (async () => {
            await dispatch(deleteRepository(repositoryName));
            const repositoriesState = getState()[BRANCH_NAME][STEM_NAME];
            const { success } = repositoriesState.repositoryDeleted;

            if (success) {
                await dispatch(fetchRepositories());
                dispatch(toggleRepositoryDrilldownPlane('closed'));
                dispatch(setNotificationState({
                    type: 'success',
                    messageKey: 'deleteRepositorySuccess'
                }));
            } else {
                dispatch(setNotificationState({
                    type: 'error',
                    messageKey: 'deleteRepositoryFailure'
                }));
            }
        })();
    };
};

export {
    deleteRepositoryAndDoPostRender
};
