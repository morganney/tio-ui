import React from 'react';
import PropTypes from 'prop-types';
import { FormItem } from '@hivekit/form';
import { RadioButton, RadioButtonGroup } from '@hivekit/radio-button';

const EnforcementTypeInputView = ({
    input,

    // i18n messages
    enforcementLabel,
    failBuildLabel,
    blockLabel
}) => {
    // Redux-form store data
    const { value } = input;

    // Redux-form event handlers, to update the store
    const enforcementTypeChange = (evt) => {
        input.onChange(evt.currentTarget.getAttribute('value'));
    };

    // Props for return
    const radioGroupProps = {
        selectedOption: value,
        onChange: enforcementTypeChange
    };

    const radioFailProps = {
        label: failBuildLabel,
        value: 'fail_build'
    };

    const radioBlockProps = {
        label: blockLabel,
        value: 'block'
    };

    return (
        <FormItem label={enforcementLabel}>
            <RadioButtonGroup {...radioGroupProps}>
                <RadioButton {...radioFailProps} />
                <RadioButton {...radioBlockProps} />
            </RadioButtonGroup>
        </FormItem>
    );
};

EnforcementTypeInputView.propTypes = {
    input: PropTypes.object.isRequired,

    // i18n strings
    enforcementLabel: PropTypes.string.isRequired,
    failBuildLabel: PropTypes.string.isRequired,
    blockLabel: PropTypes.string.isRequired
};

export { EnforcementTypeInputView };
