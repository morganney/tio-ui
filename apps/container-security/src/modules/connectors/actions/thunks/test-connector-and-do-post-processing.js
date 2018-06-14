import {
    testConnector,
    setNotificationState,
    runConnectorAndDoPostProcessing
} from '../';
import {
    BRANCH_NAME,
    STEM_NAME
} from '../../constants';

const testConnectorAndDoPostProcessing = (importId = '') => {
    // This is a thunk
    return (dispatch, getState) => {
        (async () => {
            await dispatch(testConnector(importId));
            const connectorState = getState()[BRANCH_NAME][STEM_NAME];
            const success = connectorState.connectorTested;

            if (success) {
                dispatch(runConnectorAndDoPostProcessing(importId));
            } else {
                dispatch(setNotificationState({
                    type: 'error',
                    messageKey: 'notificationConnectorTestFail'
                }));
            }
        })();
    };
};

export {
    testConnectorAndDoPostProcessing
};
