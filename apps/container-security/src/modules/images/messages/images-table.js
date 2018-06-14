import { defineMessages } from 'react-intl';

const ImagesTableMessages = defineMessages({
    imagesPlaneFullHeader: {
        id: 'IMAGES_PLANE_FULL_HEADER',
        description: 'plane full header title for images',
        defaultMessage: 'Images'
    },
    columnImage: {
        id: 'IMAGES_TABLE_COLUMN_IMAGE',
        description: 'image table image name column header',
        defaultMessage: 'Image'
    },
    columnRepository: {
        id: 'IMAGES_TABLE_COLUMN_REPOSITORY',
        description: 'image table repository column header',
        defaultMessage: 'Repository'
    },
    columnTag: {
        id: 'IMAGES_TABLE_COLUMN_TAG',
        description: 'image table tag column header',
        defaultMessage: 'Tag'
    },
    columnVulnerabilities: {
        id: 'IMAGES_TABLE_COLUMN_VULNERABILITIES',
        description: 'image table vulnerabilties column header',
        defaultMessage: 'Vulnerabilities'
    },
    columnMalware: {
        id: 'IMAGES_TABLE_COLUMN_MALWARE',
        description: 'image table malware column header',
        defaultMessage: 'Malware'
    },
    columnRisk: {
        id: 'IMAGES_TABLE_COLUMN_RISK',
        description: 'image table risk column header',
        defaultMessage: 'Risk'
    },
    columnAnalyzedTime: {
        id: 'IMAGES_TABLE_COLUMN_ANALYZED_TIME',
        description: 'image table analyzed time column header',
        defaultMessage: 'Analyzed Time'
    },
    summaryCardHighRisk: {
        id: 'CONSEC_IMAGES_SUMMARY_CARD_HIGH_RISK',
        description: 'summary card percentage graph high risk title',
        defaultMessage: 'High Risk'
    },
    summaryCardLatest: {
        id: 'CONSEC_IMAGES_SUMMARY_CARD_LATEST',
        description: 'summary card percentage graph latest title',
        defaultMessage: 'Latest'
    }
});

export {
    ImagesTableMessages
};
