import React from 'react';
import PropTypes from 'prop-types';
import { TextInput } from '@hivekit/text-input';
import { FormItem } from '@hivekit/form';

const PriorityInputView = ({
    input,
    label
}) => {
    return (
        <FormItem label={label}>
            <TextInput
                width={'70px'}
                {...input} />
        </FormItem>
    );
};

PriorityInputView.propTypes = {
    input: PropTypes.object.isRequired,
    label: PropTypes.string
};

export { PriorityInputView };
