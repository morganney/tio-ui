import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import coreMessages from 'tio-app/messages';
import { DashboardConnectorsMessages } from 'tio-container-security/modules/dashboard/messages';

import { DashboardConnectorLifecycles } from './lifecycles';

const mapStateToProps = (state, props) => {
    // Unpack state and props
    const { intl } = props;

    // Message translation
    const { connectorsDescription } = DashboardConnectorsMessages;
    const importMessage = coreMessages.buttons.buttonImport;

    return {
        // i18n messages
        connectorsDescriptionMessage: intl.formatMessage(connectorsDescription),
        importLinkText: intl.formatMessage(importMessage)
    };
};
const mapDispatchToProps = {};

const DashboardConnectorContainer = compose(
    injectIntl,
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(DashboardConnectorLifecycles);

export {
    DashboardConnectorContainer
};
