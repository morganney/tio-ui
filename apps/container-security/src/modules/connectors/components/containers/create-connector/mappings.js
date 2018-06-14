import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { injectIntl } from 'react-intl';
import { reset } from 'redux-form';
import { compose } from 'recompose';

import { messages as connectorsMessages } from 'tio-container-security/modules/connectors';
import { BRANCH_NAME, STEM_NAME } from 'tio-container-security/modules/connectors/constants';
import {
    toggleCreateConnectorPlane,
    setNotificationState
} from 'tio-container-security/modules/connectors/actions';

import { CreateConnectorLifecycles } from './lifecycles';

const mapStateToProps = (state, props) => {
    const {
        createConnectorPlaneDisplay,
        notificationState
    } = state[BRANCH_NAME][STEM_NAME];
    const { messageKey } = notificationState;
    const { intl } = props;

    // Message translation
    const { headerDescription, headerTitle } = connectorsMessages.header;
    let notificationMessage = null;

    // Reducer passes in object key, then the mappings import the messages and pluck it out
    if (typeof messageKey === 'string') {
        const messageObject = connectorsMessages.notifications[messageKey];
        notificationMessage = intl.formatMessage(messageObject);
    }

    return {
        // Redux store
        createConnectorPlaneDisplay,

        // i18n messages
        descriptionText: intl.formatMessage(headerDescription),
        titleText: intl.formatMessage(headerTitle),

        // Notification mapping from thunks
        notificationType: notificationState.type,
        notificationMessage
    };
};
const mapDispatchToProps = {
    toggleCreateConnectorPlane,
    setNotificationState,
    reset
};
const CreateConnectorContainer = compose(
    withRouter,
    injectIntl,
    connect(mapStateToProps, mapDispatchToProps)
)(CreateConnectorLifecycles);

export {
    CreateConnectorContainer
};
