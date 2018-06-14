import React, { Component } from 'react';
import { Field } from 'redux-form';
import PropTypes from 'prop-types';
import { PlanePreviewItem } from '@hivekit/plane';
import {
    Form,
    FormSection
} from '@hivekit/form';

import {
    CheckboxInputComponent,
    SelectDataSourceComponent,
    TextInputComponent
} from 'tio-container-security/modules/connectors/components';

class ConnectorFormBodyView extends Component {
    static propTypes = {
        // Redux props
        handleSubmit: PropTypes.func.isRequired,

        // i18n messages
        passwordText: PropTypes.string.isRequired,
        portText: PropTypes.string.isRequired,
        urlText: PropTypes.string.isRequired,
        usernameText: PropTypes.string.isRequired
    };

    constructor () {
        super();

        this.renderFormSelect = this.renderFormSelect.bind(this);
        this.renderFormInputs = this.renderFormInputs.bind(this);
        this.renderCheckbox = this.renderCheckbox.bind(this);
    }

    renderFormSelect () {
        return (
            <Field name='provider' component={SelectDataSourceComponent} label='DATA SOURCE' />
        );
    }

    renderCheckbox () {
        return (
            <Field name='ssl' component={CheckboxInputComponent} label='Require SSL' />
        );
    }

    renderFormInputs () {
        const { passwordText, usernameText, portText, urlText } = this.props;
        // text inputs

        return (
            <React.Fragment>
                <Field name='host' component={TextInputComponent} label={urlText} type='text' />
                <Field name='port' component={TextInputComponent} label={portText} type='text' />
                <Field name='username' component={TextInputComponent} label={usernameText} type='text' />
                <Field name='password' component={TextInputComponent} label={passwordText} type='password' />
            </React.Fragment>
        );
    }

    // React's render
    render () {
        const { handleSubmit } = this.props;

        return (
            <Form onSubmit={handleSubmit}>
                <PlanePreviewItem>
                    <FormSection>
                        {this.renderFormSelect()}
                        {this.renderFormInputs()}
                        {this.renderCheckbox()}
                    </FormSection>
                </PlanePreviewItem>
            </Form>
        );
    }
}

export {
    ConnectorFormBodyView
};
