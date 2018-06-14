import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@hivekit/button';
import { FormFooter } from '@hivekit/form';

const PolicyFormFooterView = ({
    // i18n messages
    cancelText,

    // Redux-form props
    handleSubmit,

    // Presentation props
    saveText,
    onFormSubmit,
    onFormCancel
}) => {
    const submitReduxForm = (values) => {
        // I can only access onFormSubmit at the presentation level.
        // So unfortunately this logic is here to remain reusable.

        // Data point derivations
        // priority comes in a string, but backend expects a num - so use parseInt
        const { name, priority, repositories, conditions, enforcement } = values;
        const payload = {
            name,
            priority: parseInt(priority, 10),
            all_repos: true,
            policy_type: conditions.type,
            action: enforcement.type
        };

        // Payload construction
        if (repositories.type === 'specific') {
            payload.all_repos = false;
            payload.repo_id = repositories.specificRepository.value;
        }

        if (conditions.type === 'cvss') {
            payload.cvss_operator = conditions.cvssOperator;
            payload.cvss_value = parseFloat(conditions.cvssValue);
        }

        if (conditions.type === 'cve') {
            payload.cves = conditions.cves.split(/,\s*/);
        }

        if (conditions.type === 'malware') {
            if (conditions.malwareValue === 'true') {
                payload.malware_value = true;
            } else {
                payload.malware_value = false;
            }
        }

        // Send payload to custom redux action provided by parent
        // either does POST or PUT
        if (typeof onFormSubmit === 'function') {
            onFormSubmit(payload);
        }
    };
    const cancelProps = {
        mr: 2,
        kind: 'tertiary',
        onClick: onFormCancel
    };
    // handleSubmit does currying, returns a function that is fired on click.
    // We do handleSubmit(submitReduxForm), because this is the only place I can access `onFormSubmit`
    // So I pass my onFormSubmit handler as a param, as suggested here:
    // https://redux-form.com/6.6.3/docs/api/reduxform.md/
    const saveProps = {
        kind: 'primary',
        onClick: handleSubmit(submitReduxForm)
    };

    return (
        <FormFooter>
            <Button {...cancelProps}>{cancelText}</Button>
            <Button {...saveProps}>{saveText}</Button>
        </FormFooter>
    );
};

PolicyFormFooterView.propTypes = {
    // i18n messages
    cancelText: PropTypes.string.isRequired,

    // Redux-form props
    handleSubmit: PropTypes.func.isRequired,

    // Presentation props
    saveText: PropTypes.string.isRequired,
    onFormSubmit: PropTypes.func.isRequired,
    onFormCancel: PropTypes.func.isRequired
};

export { PolicyFormFooterView };
