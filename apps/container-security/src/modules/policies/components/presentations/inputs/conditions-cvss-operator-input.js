import React from 'react';
import PropTypes from 'prop-types';
import { Select } from '@hivekit/select';

const ConditionsCvssOperatorInputView = ({
    input
}) => {
    // Redux-form store data
    const { value } = input;

    // Redux-form event handlers, to update the store
    const cvssOperatorChange = (selectOption) => {
        input.onChange(selectOption.value);
    };

    // Derived data
    const cvssOptions = [
        {
            value: 'eq',
            label: '='
        },
        {
            value: 'gt',
            label: '\u003E'
        },
        {
            value: 'lt',
            label: '\u003C'
        },
        {
            value: 'gte',
            label: '\u2265'
        },
        {
            value: 'lte',
            label: '\u2264'
        }
    ];

    // Props for return
    const selectProps = {
        ml: 1,
        placeholder: '',
        value,
        options: cvssOptions,
        searchable: false,
        onChange: cvssOperatorChange
    };

    return (
        <Select {...selectProps} />
    );
};

ConditionsCvssOperatorInputView.propTypes = {
    input: PropTypes.object.isRequired
};

export { ConditionsCvssOperatorInputView };
