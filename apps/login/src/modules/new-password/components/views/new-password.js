import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { Button } from '@hivekit/button';
import { Form, FormItem } from '@hivekit/form';
import { TextInput } from '@hivekit/text-input';

const NewPassword = ({
    match,
    password,
    reset,
    onSubmit,
    onChange,
    onFocus,
    errors
}) => {
    const { validation, network } = errors;
    const handleSubmit = (evt) => {
        evt.preventDefault();
        onSubmit(password, match.params.key);
    };
    const handlePasswordChange = (evt) => {
        onChange(evt.currentTarget.value);
    };
    const handleOnFocus = (evt) => {
        onFocus(evt.currentTarget.name);
    };

    if (reset) {
        return <Redirect to={{
            pathname: '/',
            state: {
                notifications: ['User password changed successfully.']
            }
        }} />;
    }

    return (
        <React.Fragment>
            <p>{network}</p>
            <p>Your password has been reset. Complete this form to create a new password.</p>
            <Form onSubmit={handleSubmit}>
                <FormItem error={validation.password ? validation.password : ''}>
                    <TextInput
                        name='password'
                        placeholder='New Passwword'
                        autoComplete='new-password'
                        type='password'
                        value={password}
                        onChange={handlePasswordChange}
                        onFocus={handleOnFocus}
                    />
                </FormItem>
                <Button type='submit' kind='primary'>Sign in</Button>
            </Form>
            <Link to='/'>Back to Login</Link>
        </React.Fragment>
    );
};

NewPassword.propTypes = {
    match: PropTypes.object.isRequired,
    password: PropTypes.string.isRequired,
    reset: PropTypes.bool.isRequired,
    errors: PropTypes.object.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onFocus: PropTypes.func.isRequired
};

export default NewPassword;
