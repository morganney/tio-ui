import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { Button } from '@hivekit/button';
import { Form, FormItem } from '@hivekit/form';
import { TextInput } from '@hivekit/text-input';

const PasswordReset = ({
    onSubmit,
    onEnterUsername,
    onEnterCaptchaAnswer,
    onFocus,
    username,
    captchaAnswer,
    captcha,
    sent,
    errors
}) => {
    const { validation, network } = errors;
    const handleUsernameChange = (evt) => {
        onEnterUsername(evt.currentTarget.value);
    };
    const handleCaptchaAnswerChange = (evt) => {
        onEnterCaptchaAnswer(evt.currentTarget.value);
    };
    const handleSubmit = (evt) => {
        evt.preventDefault();
        onSubmit(username, captchaAnswer, captcha.answer);
    };
    const handleOnFocus = (evt) => {
        onFocus(evt.currentTarget.name);
    };

    if (sent) {
        const msg = `Password reset requested successfully. Instructions have been sent to ${username}`;

        return <Redirect to={{
            pathname: '/',
            state: {
                notifications: [msg]
            }
        }} />;
    }

    return (
        <React.Fragment>
            <p>{network}</p>
            <p>Completing this form will send you an email with a link to reset your password.</p>
            <Form onSubmit={handleSubmit}>
                <FormItem error={validation.username ? validation.username : ''}>
                    <TextInput
                        name='username'
                        placeholder='Username'
                        value={username}
                        onChange={handleUsernameChange}
                        onFocus={handleOnFocus}
                    />
                </FormItem>
                <FormItem error={validation.captcha ? validation.captcha : ''}>
                    <TextInput
                        name='captcha'
                        placeholder={captcha.question}
                        maxLength='2'
                        value={captchaAnswer}
                        onChange={handleCaptchaAnswerChange}
                        onFocus={handleOnFocus}
                    />
                </FormItem>
                <Button kind='primary' type='submit'>
                    Send
                </Button>
            </Form>
            <Link to='/'>Back to Login</Link>
        </React.Fragment>
    );
};

PasswordReset.propTypes = {
    username: PropTypes.string.isRequired,
    captcha: PropTypes.object.isRequired,
    captchaAnswer: PropTypes.string.isRequired,
    sent: PropTypes.bool.isRequired,
    onEnterUsername: PropTypes.func.isRequired,
    onEnterCaptchaAnswer: PropTypes.func.isRequired,
    onFocus: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
};

export default PasswordReset;
