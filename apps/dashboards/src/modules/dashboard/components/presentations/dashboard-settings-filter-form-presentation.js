import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { Form, FormItem } from '@hivekit/form';
import { Select } from '@hivekit/select';

const DashboardSettingsFilterFormView = ({
    renderChildInput
}) => {
    const assetOptions = [
        { value: 'all', label: 'All Assets' },
        { value: 'targetList', label: 'Target Group' },
        { value: 'hostAddress', label: 'Custom' }
    ];
    const assetOptionsSelect = (field) => {
        return (
            <FormItem label='Select Assets'>
                <Select
                    {...field.input}
                    options={assetOptions}>
                </Select>
            </FormItem>
        );
    };

    return (
        <Form>
            <Field
                name='selectAssets'
                component={assetOptionsSelect} />
            {renderChildInput()}
        </Form>
    );
};

DashboardSettingsFilterFormView.propTypes = {
    renderChildInput: PropTypes.func.isRequired
};

export {
    DashboardSettingsFilterFormView
};
