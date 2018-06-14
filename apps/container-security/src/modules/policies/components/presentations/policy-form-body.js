import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { Form, FormSection } from '@hivekit/form';
import { PlanePreviewItem } from '@hivekit/plane';

import {
    RepositoryTypeInputComponent,
    ConditionsTypeInputComponent,
    EnforcementTypeInputComponent,
    PriorityInputComponent
} from 'tio-container-security/modules/policies/components';
import { REDUX_FORM_EDIT_POLICY } from 'tio-container-security/modules/policies/constants';

const PolicyFormBodyView = ({
    // Redux-form props
    form,

    // i18n messages
    repositoriesLabel,
    allRepositoriesLabel,
    specificRepositoryLabel,
    specificRepositoryPlaceholder,
    conditionsLabel,
    cvssLabel,
    cvssValuePlaceholder,
    cveLabel,
    cvesPlaceholder,
    malwareLabel,
    malwareTrueLabel,
    malwareFalseLabel,
    enforcementLabel,
    failBuildLabel,
    blockLabel,
    priorityLabel
}) => {
    const renderFormPriority = () => {
        if (form === REDUX_FORM_EDIT_POLICY) {
            // Props for return
            const fieldProps = {
                name: 'priority',
                component: PriorityInputComponent,
                props: {
                    label: priorityLabel
                }
            };

            // JSX
            return <Field {...fieldProps} />;
        }

        return null;
    };

    const renderFormRepositories = () => {
        // Props for return
        const fieldProps = {
            name: 'repositories.type',
            component: RepositoryTypeInputComponent,
            props: {
                // i18n messages
                repositoriesLabel,
                allRepositoriesLabel,
                specificRepositoryLabel,
                specificRepositoryPlaceholder
            }
        };

        // JSX
        return (
            <Field {...fieldProps} />
        );
    };

    const renderFormConditions = () => {
        // Props for return
        const fieldProps = {
            name: 'conditions.type',
            component: ConditionsTypeInputComponent,
            props: {
                conditionsLabel,
                cvssLabel,
                cvssValuePlaceholder,
                cveLabel,
                cvesPlaceholder,
                malwareLabel,
                malwareTrueLabel,
                malwareFalseLabel
            }
        };

        // JSX
        return (
            <Field {...fieldProps} />
        );
    };

    const renderFormEnforcement = () => {
        // Props for return
        const fieldProps = {
            name: 'enforcement.type',
            component: EnforcementTypeInputComponent,
            props: {
                enforcementLabel,
                failBuildLabel,
                blockLabel
            }
        };

        // JSX
        return (
            <Field {...fieldProps} />
        );
    };

    // JSX markup
    return (
        <Form>
            <PlanePreviewItem>
                <FormSection>
                    {renderFormPriority()}
                    {renderFormRepositories()}
                    {renderFormConditions()}
                    {renderFormEnforcement()}
                </FormSection>
            </PlanePreviewItem>
        </Form>
    );
};

PolicyFormBodyView.propTypes = {
    // Redux-form props
    form: PropTypes.string.isRequired,

    // i18n messages
    repositoriesLabel: PropTypes.string.isRequired,
    allRepositoriesLabel: PropTypes.string.isRequired,
    specificRepositoryLabel: PropTypes.string.isRequired,
    specificRepositoryPlaceholder: PropTypes.string.isRequired,
    conditionsLabel: PropTypes.string.isRequired,
    cvssLabel: PropTypes.string.isRequired,
    cvssValuePlaceholder: PropTypes.string.isRequired,
    cveLabel: PropTypes.string.isRequired,
    cvesPlaceholder: PropTypes.string.isRequired,
    malwareLabel: PropTypes.string.isRequired,
    malwareTrueLabel: PropTypes.string.isRequired,
    malwareFalseLabel: PropTypes.string.isRequired,
    enforcementLabel: PropTypes.string.isRequired,
    failBuildLabel: PropTypes.string.isRequired,
    blockLabel: PropTypes.string.isRequired,
    priorityLabel: PropTypes.string.isRequired
};

export {
    PolicyFormBodyView
};
