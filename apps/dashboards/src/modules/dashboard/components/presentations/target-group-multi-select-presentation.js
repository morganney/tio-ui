import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { FormItem } from '@hivekit/form';
import { Select } from '@hivekit/select';

const TargetGroupMultiSelect = ({ targetGroups }) => {
    const formattedTargetGroups = [];
    const renderMultiSelect = (field) => {
        const { input, meta: { error } } = field;

        return (
            <FormItem error={error}>
                <Select
                    {...input}
                    placeholder='Select Target Group(s)'
                    multi={true}
                    options={formattedTargetGroups}>
                </Select>
            </FormItem>
        );
    };

    for (let i = 0; i < targetGroups.length; i++) {
        const targetGroup = targetGroups[i];

        if (!targetGroup.default_group) {
            formattedTargetGroups.push({
                ...targetGroup,
                label: targetGroup.name,
                value: targetGroup.id
            });
        }
    }

    return (
        <Field
            name='targetGroups'
            component={renderMultiSelect}
        />
    );
};

TargetGroupMultiSelect.propTypes = {
    targetGroups: PropTypes.array.isRequired
};

export {
    TargetGroupMultiSelect
};
