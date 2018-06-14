import { compose } from 'recompose';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { injectIntl } from 'react-intl';
import { withRouter } from 'react-router-dom';

import { messages as connectorsMessages } from 'tio-container-security/modules/connectors';

import { ConnectorFormBodyLifecycles } from './lifecycles';

import { createConnectorAndDoPostProcessing } from '../../../actions';
import { CONNECTOR_REDUX_FORM } from '../../../constants';

const handleSubmit = (values, dispatch) => {
    const { port, ...otherValues } = values;
    const payload = {
        port: parseInt(port, 10),
        ...otherValues
    };

    return dispatch(createConnectorAndDoPostProcessing(payload));
};

const mapStateToProps = (state, props) => {
    const { intl } = props;

    // Message translation
    const { formPassword, formUsername, formPort, formUrl } = connectorsMessages.form;

    return {
        // i18n messages
        passwordText: intl.formatMessage(formPassword),
        usernameText: intl.formatMessage(formUsername),
        portText: intl.formatMessage(formPort),
        urlText: intl.formatMessage(formUrl)
    };
};

const mapDispatchToProps = {};

const ConnectorFormBodyContainer = compose(
    injectIntl,
    withRouter,
    connect(mapStateToProps, mapDispatchToProps),
    reduxForm({
        // Meta config
        form: CONNECTOR_REDUX_FORM,
        initialValues: {
            provider: 'dr',
            host: '',
            port: '',
            username: '',
            password: '',
            ssl: false
        },
        enableReinitialize: true,

        // Event handlers
        onSubmit: handleSubmit
    })
)(ConnectorFormBodyLifecycles);

export {
    ConnectorFormBodyContainer
};
