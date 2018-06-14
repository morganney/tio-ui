import React from 'react';
import PropTypes from 'prop-types';
import { FormItem } from '@hivekit/form';
import { TextInput } from '@hivekit/text-input';

const UsernameField = ({ meta, input, placeholder }) => {
    const { touched, error } = meta;

    return (
        <FormItem error={touched && error ? error : ''}>
            <TextInput
                { ...input }
                autoComplete='username'
                placeholder={placeholder}
            />
        </FormItem>
    );
};

UsernameField.propTypes = {
    meta: PropTypes.object.isRequired,
    input: PropTypes.object.isRequired,
    placeholder: PropTypes.string.isRequired
};

export {
    UsernameField
};
