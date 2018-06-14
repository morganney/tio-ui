import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { submit } from 'redux-form';

import coreMessages from 'tio-app/messages';

import { ConnectorFormFooterLifecycles } from './lifecycles';

const mapStateToProps = (state, props) => {
    const cancelMessageObject = coreMessages.buttons.buttonCancel;
    const importMessageObject = coreMessages.buttons.buttonImport;
    const { intl } = props;

    return {
        // i18n messages
        cancelText: intl.formatMessage(cancelMessageObject),
        importText: intl.formatMessage(importMessageObject)
    };
};

const mapDispatchToProps = {
    submit
};

const ConnectorFormFooterContainer = injectIntl(
    connect(mapStateToProps, mapDispatchToProps)(ConnectorFormFooterLifecycles)
);

export {
    ConnectorFormFooterContainer
};
