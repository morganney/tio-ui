import { connect } from 'react-redux';
import { compose } from 'recompose';
import { injectIntl } from 'react-intl';

import coreMessages from 'tio-app/messages';

import { PolicyFormFooterLifecycles } from './lifecycles';

const mapStateToProps = (state, props) => {
    // Unpack state and props
    const { intl } = props;

    // i18n messages
    const { buttonCancel } = coreMessages.buttons;

    return {
        // i18n messages
        cancelText: intl.formatMessage(buttonCancel)
    };
};
const mapDispatchToProps = {};
const PolicyFormFooterContainer = compose(
    injectIntl,
    connect(mapStateToProps, mapDispatchToProps)
)(PolicyFormFooterLifecycles);

export {
    PolicyFormFooterContainer
};
