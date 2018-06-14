import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormItem } from '@hivekit/form';
import { Checkbox } from '@hivekit/checkbox';

class CredentialCheckboxInputView extends Component {
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
                'default': defaultValue = '',
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
            configuration: { name, required },
            input: { value, onChange, onBlur },
            meta: { touched, error }
        } = this.props;

        const handleChange = (evt) => {
            const checked = evt.target.checked;

            onChange(checked ? 'yes' : 'no');
        };

        return (
            <FormItem required={required} error={touched && error ? error : ''} mb={2}>
                <Checkbox
                    onChange={handleChange}
                    onBlur={onBlur}
                    label={name}
                    value='yes'
                    checked={value === 'yes'} />
            </FormItem>
        );
    }
}

export {
    CredentialCheckboxInputView
};
