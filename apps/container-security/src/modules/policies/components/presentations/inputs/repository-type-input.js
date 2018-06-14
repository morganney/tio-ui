import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { FormItem } from '@hivekit/form';
import { RadioButton, RadioButtonGroup } from '@hivekit/radio-button';

import { SpecificRepositoryInputComponent } from 'tio-container-security/modules/policies/components';

const RepositoryTypeInputView = ({
    input,

    // i18n messages
    repositoriesLabel,
    allRepositoriesLabel,
    specificRepositoryLabel,
    specificRepositoryPlaceholder
}) => {
    // Redux-form store data
    const { value } = input;

    // Redux-form event handlers, to update the store
    const repositoriesTypeChange = (evt) => {
        const val = evt.currentTarget.getAttribute('value');

        // Keystrokes on the nested input can trigger this and give a wrong null val!
        if (val) {
            input.onChange(val);
        }
    };

    // Props for return
    const radioGroupProps = {
        selectedOption: value,
        onChange: repositoriesTypeChange
    };

    const radioAllProps = {
        label: allRepositoriesLabel,
        value: 'all'
    };

    const radioSpecificProps = {
        label: specificRepositoryLabel,
        value: 'specific'
    };

    const specificRepositoryProps = {
        name: 'repositories.specificRepository',
        component: SpecificRepositoryInputComponent,
        props: {
            // i18n messages
            specificRepositoryPlaceholder
        }
    };

    // Nested redux-form fields!
    return (
        <FormItem label={repositoriesLabel}>
            <RadioButtonGroup {...radioGroupProps}>
                <RadioButton {...radioAllProps} />
                <RadioButton {...radioSpecificProps}>
                    <Field {...specificRepositoryProps} />
                </RadioButton>
            </RadioButtonGroup>
        </FormItem>
    );
};

RepositoryTypeInputView.propTypes = {
    input: PropTypes.object.isRequired,

    // i18n strings
    repositoriesLabel: PropTypes.string.isRequired,
    allRepositoriesLabel: PropTypes.string.isRequired,
    specificRepositoryLabel: PropTypes.string.isRequired,
    specificRepositoryPlaceholder: PropTypes.string.isRequired
};

export { RepositoryTypeInputView };
