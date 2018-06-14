import { defineMessages } from 'react-intl';

const formMessages = defineMessages({
    repositoriesLabel: {
        id: 'CONSEC_POLICY_FORM_REPOSITORIES_LABEL',
        description: 'Label for the Repositories form fieldset',
        defaultMessage: 'Repositories'
    },
    allRepositoriesLabel: {
        id: 'CONSEC_POLICY_FORM_ALL_REPOSITORIES_LABEL',
        description: 'Label for the All Repositories selection on the form',
        defaultMessage: 'All Repositories'
    },
    specificRepositoryLabel: {
        id: 'CONSEC_POLICY_FORM_SPECIFIC_REPOSITORY_LABEL',
        description: 'Label for the Specific Repository selection on the form',
        defaultMessage: 'Specific Repository'
    },
    specificRepositoryPlaceholder: {
        id: 'CONSEC_POLICY_FORM_SPECIFIC_REPOSITORY_PLACEHOLDER',
        description: 'Placeholder for the Specific Repository selection on the form',
        defaultMessage: 'Specific Repository'
    },
    conditionsLabel: {
        id: 'CONSEC_POLICY_FORM_CONDITIONS_LABEL',
        description: 'Label for the Conditions form fieldset',
        defaultMessage: 'Conditions'
    },
    cvssLabel: {
        id: 'CONSEC_POLICY_FORM_CVSS_LABEL',
        description: 'Label for the Max CVSS form input',
        defaultMessage: 'Max CVSS Value'
    },
    cvssValuePlaceholder: {
        id: 'CONSEC_POLICY_FORM_CVSS_VALUE_PLACEHOLDER',
        description: 'Placeholder for the CVSS value form input',
        defaultMessage: 'CVSS Value'
    },
    cveLabel: {
        id: 'CONSEC_POLICY_FORM_CVE_LABEL',
        description: 'Label for the CVE form input',
        defaultMessage: 'CVE'
    },
    cvesPlaceholder: {
        id: 'CONSEC_POLICY_FORM_CVES_PLACEHOLDER',
        description: 'Placeholder for the CVEs form input',
        defaultMessage: 'CVE-2001-0855, CVE-2001-0955'
    },
    malwareLabel: {
        id: 'CONSEC_POLICY_FORM_MALWARE_LABEL',
        description: 'Label for the Malware form input',
        defaultMessage: 'Malware'
    },
    enforcementLabel: {
        id: 'CONSEC_POLICY_FORM_ENFORCEMENT_LABEL',
        description: 'Label for the Enforcement form fieldset',
        defaultMessage: 'Enforcement Action'
    },
    failBuildLabel: {
        id: 'CONSEC_POLICY_FORM_FAIL_BUILD_LABEL',
        description: 'Label for the fail_build radio button input',
        defaultMessage: 'Set Compliance Status to False'
    },
    blockLabel: {
        id: 'CONSEC_POLICY_FORM_BLOCK_LABEL',
        description: 'Label for the block radio button input',
        defaultMessage: 'Prevent/Block "docker pull"'
    },
    priorityLabel: {
        id: 'CONSEC_POLICY_FORM_PRIORITY_LABEL',
        description: 'Label for the priority input',
        defaultMessage: 'Priority'
    }
});

export {
    formMessages
};
