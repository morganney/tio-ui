import { defineMessages } from 'react-intl';

const ImagesDetailVulnerabilitiesMessages = defineMessages({
    columnVulnerability: {
        id: 'IMAGES_DETAIL_VULN_COLUMN_VULNERABILITY',
        description: 'header text for vulnerability name table column',
        defaultMessage: 'Vulnerability'
    },
    columnRiskScore: {
        id: 'IMAGES_DETAIL_VULN_COLUMN_RISK_SCORE',
        description: 'header text for risk score table column',
        defaultMessage: 'Risk Score'
    },
    columnReleaseDate: {
        id: 'IMAGES_DETAIL_VULN_COLUMN_RELEASE_DATE',
        description: 'header text for release date table column',
        defaultMessage: 'Release Date'
    }
});

export {
    ImagesDetailVulnerabilitiesMessages
};
