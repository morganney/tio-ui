import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import { injectIntl } from 'react-intl';

import { BRANCH_NAME, STEM_NAME } from 'tio-container-security/modules/policies/constants';
import {
    fetchPolicies,
    setNotificationState,
    setDrilldownPolicy,
    toggleNewPolicyPlane,
    togglePolicyTablePlane,
    toggleEditPolicyPlane
} from 'tio-container-security/modules/policies/actions';
import coreMessages from 'tio-app/messages';
import { messages as policiesMessages } from 'tio-container-security/modules/policies';

import { PolicyTableLifecycles } from './lifecycles';

const mapStateToProps = (state, props) => {
    // Unpack state and props
    const {
        policies,
        policiesError,
        policiesFetching,
        policyTablePlaneDisplay,
        notificationState
    } = state[BRANCH_NAME][STEM_NAME];
    const { messageKey } = notificationState;
    const { intl } = props;

    // i18n messages
    const { buttonAdd } = coreMessages.buttons;
    const {
        tableTitle,
        nameHeader,
        priorityHeader,
        repositoryHeader,
        typeHeader,
        actionHeader,
        operatorHeader,
        valueHeader
    } = policiesMessages.tables;

    let policiesErrorMessage = null;
    let notificationMessage = null;

    if (typeof policiesError === 'string') {
        const messageObject = coreMessages.notifications[policiesError];

        policiesErrorMessage = intl.formatMessage(messageObject);
    }

    // Reducer passes in object key, then the mappings import the messages and pluck it out
    if (typeof messageKey === 'string') {
        const messageObject = policiesMessages.notifications[messageKey];

        notificationMessage = intl.formatMessage(messageObject);
    }

    return {
        // Redux store
        policies,
        policiesFetching,
        policyTablePlaneDisplay,

        // Notification mapping from thunks
        notificationType: notificationState.type,

        // i18n messages
        policiesErrorMessage,
        notificationMessage,
        addText: intl.formatMessage(buttonAdd),
        tableTitle: intl.formatMessage(tableTitle),
        nameHeader: intl.formatMessage(nameHeader),
        priorityHeader: intl.formatMessage(priorityHeader),
        repositoryHeader: intl.formatMessage(repositoryHeader),
        typeHeader: intl.formatMessage(typeHeader),
        actionHeader: intl.formatMessage(actionHeader),
        operatorHeader: intl.formatMessage(operatorHeader),
        valueHeader: intl.formatMessage(valueHeader)
    };
};
const mapDispatchToProps = {
    fetchPolicies,
    togglePolicyTablePlane,
    toggleNewPolicyPlane,
    toggleEditPolicyPlane,
    setNotificationState,
    setDrilldownPolicy
};
const PolicyTableContainer = compose(
    withRouter,
    injectIntl,
    connect(mapStateToProps, mapDispatchToProps)
)(PolicyTableLifecycles);

export {
    PolicyTableContainer
};
