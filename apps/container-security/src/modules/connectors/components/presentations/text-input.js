import React from 'react';
import { FormItem } from '@hivekit/form';
import PropTypes from 'prop-types';
import { TextInput } from '@hivekit/text-input';

const TextInputView = ({ label, input, type }) => {
    return (
        <FormItem mt={2} label={label}>
            <TextInput {...input} type={type} />
        </FormItem>
    );
};

TextInputView.propTypes = {
    label: PropTypes.string,
    input: PropTypes.object.isRequired,
    type: PropTypes.string
};

export {
    TextInputView
};
