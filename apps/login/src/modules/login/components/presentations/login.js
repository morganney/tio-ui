import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button } from '@hivekit/button';
import { Form } from '@hivekit/form';
import { FormattedMessage } from 'react-intl';
import { Field } from 'redux-form';

import coreMessages from 'tio-app/messages';

import { UsernameField, PasswordField } from './fields';

import { requiredAsString } from '../../validators';
import { messages } from '../../messages';

const {
    placeholderUsername,
    placeholderPassword,
    validationNoEmptyInput
} = coreMessages.forms;

const usernameValidator = (value, allValues, { intl }) => {
    if (!requiredAsString(value)) {
        return intl.formatMessage(validationNoEmptyInput, {
            type: intl.formatMessage(placeholderUsername)
        });
    }
};
const passwordValidator = (value, allValues, { intl }) => {
    if (!requiredAsString(value)) {
        return intl.formatMessage(validationNoEmptyInput, {
            type: intl.formatMessage(placeholderPassword)
        });
    }
};

const LoginView = ({
    handleSubmit,
    token,
    fetching,
    location,
    networkError,
    usernamePlaceholder,
    passwordPlaceholder,
    pristine,
    hasSyncErrors
}) => {
    const notifications = [];
    const { network } = networkError;
    const disabled = pristine || fetching || hasSyncErrors;

    if (network) {
        notifications.push(network);
    }

    if (location.state && Array.isArray(location.state.notifications)) {
        notifications.push(...location.state.notifications);
    }

    if (token) {
        window.location = '/tio/app.html';

        return null;
    }

    return (
        <React.Fragment>
            {notifications.map((notice, idx) => {
                return <p key={idx}>{notice}</p>;
            })}
            <Form onSubmit={handleSubmit}>
                <Field
                    name='username'
                    component={UsernameField}
                    placeholder={usernamePlaceholder}
                    validate={usernameValidator}
                />
                <Field
                    name='password'
                    component={PasswordField}
                    placeholder={passwordPlaceholder}
                    validate={passwordValidator}
                />
                <Button kind='primary' type='submit' disabled={disabled}>
                    <FormattedMessage { ...messages.signIn } />
                </Button>
            </Form>
            <Link to='/password-reset'>
                <FormattedMessage { ...messages.forgotPasswordLink } />
            </Link>
        </React.Fragment>
    );
};

LoginView.propTypes = {
    handleSubmit: PropTypes.func,
    token: PropTypes.string.isRequired,
    networkError: PropTypes.object.isRequired,
    fetching: PropTypes.bool.isRequired,
    location: PropTypes.object.isRequired,
    usernamePlaceholder: PropTypes.string.isRequired,
    passwordPlaceholder: PropTypes.string.isRequired,
    hasSyncErrors: PropTypes.bool.isRequired,
    pristine: PropTypes.bool
};

export {
    LoginView
};
