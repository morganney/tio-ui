import React from 'react';
import PropTypes from 'prop-types';
import { TextInput } from '@hivekit/text-input';

const ConditionsCvssValueInputView = ({
    input,

    // Custom props, including i18n strings
    name,
    cvssValuePlaceholder
}) => {
    // Redux-form store data
    const { value } = input;

    // Redux-form event handlers, to update the store
    const cvssValueChange = (evt) => {
        input.onChange(evt.currentTarget.value);
    };

    // Props for return
    const textProps = {
        name,
        placeholder: cvssValuePlaceholder,
        value,
        onChange: cvssValueChange
    };

    return (
        <TextInput {...textProps} />
    );
};

ConditionsCvssValueInputView.propTypes = {
    input: PropTypes.object.isRequired,

    // custom props and i18n strings
    name: PropTypes.string.isRequired,
    cvssValuePlaceholder: PropTypes.string.isRequired
};

export { ConditionsCvssValueInputView };
