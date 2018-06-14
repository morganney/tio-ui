import { reset as resetReduxForm } from 'redux-form';

import { constants as commonConstants } from 'tio-common';
import { BASE_PATH } from 'tio-container-security/modules/common/constants';
import { Store } from 'tio-alloy';

import {
    runConnector,
    toggleCreateConnectorPlane,
    setNotificationState
} from '../';
import {
    BRANCH_NAME,
    STEM_NAME,
    CONNECTOR_REDUX_FORM
} from '../../constants';

const history = Store.getHistory();

const runConnectorAndDoPostProcessing = (importId = '') => {
    // This is a thunk
    return (dispatch, getState) => {
        (async () => {
            await dispatch(runConnector(importId));
            const connectorState = getState()[BRANCH_NAME][STEM_NAME];
            const success = connectorState.connectorRan;

            if (success) {
                // TODO: setTimeout is intended as temporary until a more formal routing transition solution is in place.
                dispatch(toggleCreateConnectorPlane('closed'));
                dispatch(resetReduxForm(CONNECTOR_REDUX_FORM));
                dispatch(setNotificationState({
                    type: 'success',
                    messageKey: 'notificationConnectorSuccess'
                }));
                setTimeout(() => {
                    history.push(`${BASE_PATH}/dashboard`);
                }, commonConstants.planeTransitionInMs);
            } else {
                dispatch(setNotificationState({
                    type: 'error',
                    messageKey: 'notificationConnectorRunFail'
                }));
            }
        })();
    };
};

export {
    runConnectorAndDoPostProcessing
};
