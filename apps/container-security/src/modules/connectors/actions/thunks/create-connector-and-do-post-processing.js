import {
    createConnector,
    setNotificationState,
    testConnectorAndDoPostProcessing
} from 'tio-container-security/modules/connectors/actions';
import {
    BRANCH_NAME,
    STEM_NAME
} from 'tio-container-security/modules/connectors/constants';

const createConnectorAndDoPostProcessing = (payload = {}) => {
    return (dispatch, getState) => {
        (async () => {
            await dispatch(createConnector(payload));
            const connectorState = getState()[BRANCH_NAME][STEM_NAME];
            const { success, data } = connectorState.connectorCreated;
            const { id } = data;

            if (success) {
                dispatch(testConnectorAndDoPostProcessing(id));
            } else {
                dispatch(setNotificationState({
                    type: 'error',
                    messageKey: 'notificationConnectorFail'
                }));
            }
        })();
    };
};

export {
    createConnectorAndDoPostProcessing
};
