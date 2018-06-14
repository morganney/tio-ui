import { connect } from 'react-redux';
import { compose } from 'recompose';
import { injectIntl } from 'react-intl';

import coreMessages from 'tio-app/messages';
import { messages as repositoriesMessages } from 'tio-container-security/modules/repositories';
import { deleteRepositoryAndDoPostRender } from 'tio-container-security/modules/repositories/actions';

import { RepositoryActionsLifecycles } from './lifecycles';

const mapStateToProps = (state, props) => {
    const { intl } = props;
    const { confirmDeletionTitle } = coreMessages.notifications;
    const { buttonCancel, buttonDelete } = coreMessages.buttons;
    const { deleteRepositoryRequest } = repositoriesMessages.notifications;

    return {
        // i18n messages
        titleText: intl.formatMessage(confirmDeletionTitle),
        messageText: intl.formatMessage(deleteRepositoryRequest),
        cancelText: intl.formatMessage(buttonCancel),
        deleteText: intl.formatMessage(buttonDelete)
    };
};
const mapDispatchToProps = {
    actionDeleteRepository: deleteRepositoryAndDoPostRender
};
const RepositoryActionsContainer = compose(
    injectIntl,
    connect(mapStateToProps, mapDispatchToProps)
)(RepositoryActionsLifecycles);

export {
    RepositoryActionsContainer
};
