import React from 'react';
import PropTypes from 'prop-types';
import { FormItem } from '@hivekit/form';
import { Checkbox } from '@hivekit/checkbox';

const CheckboxInputView = ({ label, input }) => {
    const { value } = input;

    const handleCheckboxChange = (event) => {
        input.onChange(event.target.checked);
    };

    return (
        <FormItem>
            <Checkbox
                type='checkbox'
                label={label}
                onChange={handleCheckboxChange}
                checked={value}/>
        </FormItem>
    );
};

CheckboxInputView.propTypes = {
    label: PropTypes.string,
    input: PropTypes.object.isRequired
};

export {
    CheckboxInputView
};
