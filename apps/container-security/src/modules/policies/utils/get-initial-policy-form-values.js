const getInitialPolicyFormValues = (drilldownPolicy = null) => {
    const initialFormState = {
        name: null,
        priority: '1',
        repositories: {
            type: 'all',
            specificRepository: null
        },
        conditions: {
            type: 'cvss',
            cvssOperator: 'eq',
            cvssValue: '',
            cves: '',
            malwareValue: 'true'
        },
        enforcement: {
            type: 'fail_build'
        }
    };
    const initialValues = {
        ...initialFormState
    };

    if (drilldownPolicy) {
        // Prefill the form, by setting redux-form's initialValues to the drilldown data.
        initialValues.name = drilldownPolicy.name;
        initialValues.priority = drilldownPolicy.priority.toString();

        if (drilldownPolicy.repository) {
            initialValues.repositories.type = 'specific';
            initialValues.repositories.specificRepository = {
                value: drilldownPolicy.repository.id,
                label: drilldownPolicy.repository.name
            };
        }

        if (drilldownPolicy.policyType) {
            initialValues.conditions.type = drilldownPolicy.policyType;

            if (drilldownPolicy.policyType === 'cvss') {
                initialValues.conditions.cvssOperator = drilldownPolicy.operator;
                initialValues.conditions.cvssValue = drilldownPolicy.value;
            }

            if (drilldownPolicy.policyType === 'cve') {
                initialValues.conditions.cves = drilldownPolicy.value;
            }

            if (drilldownPolicy.policyType === 'malware') {
                initialValues.conditions.malwareValue = drilldownPolicy.value;
            }
        }

        if (drilldownPolicy.action) {
            initialValues.enforcement.type = drilldownPolicy.action;
        }
    }

    return initialValues;
};

export {
    getInitialPolicyFormValues
};
