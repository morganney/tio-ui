import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormItem } from '@hivekit/form';
import { TextInput } from '@hivekit/text-input';

class CredentialTextInputView extends Component {
    static propTypes = {
        /**
         * The configuration for this input
         */
        configuration: PropTypes.object.isRequired,
        /**
         * Redux form input settings
         */
        input: PropTypes.object,
        /**
         * Additional redux form information (like error messages, touched flag, etc.)
         */
        meta: PropTypes.object,
        /**
         * Redux Form Dispatches attached to the form
         */
        reduxFormDispatches: PropTypes.object
    };

    componentDidMount () {
        const {
            configuration: {
                default: defaultValue = '',
                id
            },
            input: {
                value = ''
            },
            reduxFormDispatches: {
                change
            }
        } = this.props;

        if (value === '' && defaultValue !== '') {
            change(id, defaultValue);
        }
    }

    render () {
        const {
            configuration: { name, type, placeholder, required },
            input,
            meta: { touched, error }
        } = this.props;

        return (
            <FormItem label={name} required={required} error={touched && error ? error : ''} mb={2}>
                <TextInput
                    {...input}
                    placeholder={placeholder}
                    type={type} />
            </FormItem>
        );
    }
}

export {
    CredentialTextInputView
};
