import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { FormItem } from '@hivekit/form';
import { RadioButton, RadioButtonGroup } from '@hivekit/radio-button';
import { SelectTextGroup } from '@hivekit/select-text-group';

import {
    ConditionsCvssOperatorInputComponent,
    ConditionsCvssValueInputComponent,
    ConditionsCvesValueInputComponent,
    ConditionsMalwareValueInputComponent
} from 'tio-container-security/modules/policies/components';

const ConditionsTypeInputView = ({
    input,

    // i18n messages
    conditionsLabel,
    cvssLabel,
    cvssValuePlaceholder,
    cveLabel,
    cvesPlaceholder,
    malwareLabel,
    malwareTrueLabel,
    malwareFalseLabel
}) => {
    // Redux-form store data
    const { value } = input;

    // Redux-form event handlers, to update the store
    const conditionsTypeChange = (evt) => {
        const val = evt.currentTarget.getAttribute('value');

        // This event can be triggered by child inputs, resulting in a type of null being set.
        // TODO: reinvestigate if this is still needed
        if (!val) {
            return;
        }

        input.onChange(val);
    };

    // Props for return
    const radioGroupProps = {
        selectedOption: value,
        onChange: conditionsTypeChange
    };

    // --- CVSS ---
    const radioCvssProps = {
        label: cvssLabel,
        value: 'cvss'
    };

    const cvssOperatorProps = {
        name: 'conditions.cvssOperator',
        component: ConditionsCvssOperatorInputComponent
    };

    const cvssValueProps = {
        name: 'conditions.cvssValue',
        component: ConditionsCvssValueInputComponent,
        props: {
            name: 'cvss',
            cvssValuePlaceholder
        }
    };

    // --- CVE ---
    const radioCveProps = {
        label: cveLabel,
        value: 'cve'
    };

    const cvesValueProps = {
        name: 'conditions.cves',
        component: ConditionsCvesValueInputComponent,
        props: {
            name: 'cves',
            cvesPlaceholder
        }
    };

    // --- MALWARE ---
    const radioMalwareProps = {
        label: malwareLabel,
        value: 'malware'
    };

    const malwareGroupProps = {
        name: 'conditions.malwareValue',
        component: ConditionsMalwareValueInputComponent,
        props: {
            malwareTrueLabel,
            malwareFalseLabel
        }
    };

    // Nested redux-form fields!
    return (
        <FormItem label={conditionsLabel}>
            <RadioButtonGroup {...radioGroupProps}>
                <RadioButton {...radioCvssProps}>
                    <SelectTextGroup>
                        <Field {...cvssOperatorProps} />
                        <Field {...cvssValueProps} />
                    </SelectTextGroup>
                </RadioButton>
                <RadioButton {...radioCveProps}>
                    <Field {...cvesValueProps} />
                </RadioButton>
                <RadioButton {...radioMalwareProps}>
                    <Field {...malwareGroupProps} />
                </RadioButton>
            </RadioButtonGroup>
        </FormItem>
    );
};

ConditionsTypeInputView.propTypes = {
    input: PropTypes.object.isRequired,

    // i18n strings
    conditionsLabel: PropTypes.string.isRequired,
    cvssLabel: PropTypes.string.isRequired,
    cvssValuePlaceholder: PropTypes.string.isRequired,
    cveLabel: PropTypes.string.isRequired,
    cvesPlaceholder: PropTypes.string.isRequired,
    malwareLabel: PropTypes.string.isRequired,
    malwareTrueLabel: PropTypes.string.isRequired,
    malwareFalseLabel: PropTypes.string.isRequired
};

export { ConditionsTypeInputView };
