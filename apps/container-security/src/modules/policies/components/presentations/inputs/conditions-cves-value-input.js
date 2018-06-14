import React from 'react';
import PropTypes from 'prop-types';
import { TextInput } from '@hivekit/text-input';

const ConditionsCvesValueInputView = ({
    input,

    // Custom props, including i18n strings
    name,
    cvesPlaceholder
}) => {
    // Redux-form store data
    const { value } = input;

    // Redux-form event handlers, to update the store
    const cveValueChange = (evt) => {
        input.onChange(evt.currentTarget.value);
    };

    // Props for return
    const textProps = {
        name,
        placeholder: cvesPlaceholder,
        value,
        onChange: cveValueChange
    };

    return (
        <TextInput {...textProps} />
    );
};

ConditionsCvesValueInputView.propTypes = {
    input: PropTypes.object.isRequired,

    // custom props and i18n strings
    name: PropTypes.string.isRequired,
    cvesPlaceholder: PropTypes.string.isRequired
};

export { ConditionsCvesValueInputView };
