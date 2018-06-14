import { connect } from 'react-redux';
import { compose } from 'recompose';
import { injectIntl } from 'react-intl';

import coreMessages from 'tio-app/messages';
import { messages as policiesMessages } from 'tio-container-security/modules/policies';
import { deletePolicyAndDoPostRender } from 'tio-container-security/modules/policies/actions';

import { PolicyActionsLifecycles } from './lifecycles';

const mapStateToProps = (state, props) => {
    const { intl } = props;
    const { confirmDeletionTitle } = coreMessages.notifications;
    const { buttonCancel, buttonDelete } = coreMessages.buttons;
    const { deletePolicyRequest } = policiesMessages.notifications;

    return {
        // i18n messages
        titleText: intl.formatMessage(confirmDeletionTitle),
        messageText: intl.formatMessage(deletePolicyRequest),
        cancelText: intl.formatMessage(buttonCancel),
        deleteText: intl.formatMessage(buttonDelete)
    };
};
const mapDispatchToProps = {
    actionDeletePolicy: deletePolicyAndDoPostRender
};
const PolicyActionsContainer = compose(
    injectIntl,
    connect(mapStateToProps, mapDispatchToProps)
)(PolicyActionsLifecycles);

export {
    PolicyActionsContainer
};
