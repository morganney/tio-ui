import { defineMessages } from 'react-intl';

const tableMessages = defineMessages({
    repositoriesTableTitle: {
        id: 'CONSEC_REPOSITORIES_TABLE_TITLE',
        description: 'The text for the title of the repositories table, within the header',
        defaultMessage: 'Repositories'
    },
    nameHeader: {
        id: 'CONSEC_REPOSITORIES_TABLE_NAME_HEADER',
        description: 'The text for the "Name" field header',
        defaultMessage: 'Repository'
    },
    pushCountHeader: {
        id: 'CONSEC_REPOSITORIES_TABLE_PUSHES_HEADER',
        description: 'The text for the "pushCount" field header',
        defaultMessage: 'Pushes'
    },
    pullCountHeader: {
        id: 'CONSEC_REPOSITORIES_TABLE_PULLS_HEADER',
        description: 'The text for the "pullCount" field header',
        defaultMessage: 'Pulls'
    },
    imagesCountHeader: {
        id: 'CONSEC_REPOSITORIES_TABLE_IMAGES_HEADER',
        description: 'The text for the "imagesCount" field header',
        defaultMessage: 'Images'
    },
    vulnerabilitiesCountHeader: {
        id: 'CONSEC_REPOSITORIES_TABLE_VULNERABILITIES_HEADER',
        description: 'The text for the "vulnerabilitiesCount" field header',
        defaultMessage: 'Vulnerabilities'
    },
    malwareCountHeader: {
        id: 'CONSEC_REPOSITORIES_TABLE_MALWARE_HEADER',
        description: 'The text for the "malwareCount" field header',
        defaultMessage: 'Malware'
    },
    sizeHeader: {
        id: 'CONSEC_REPOSITORIES_TABLE_SIZE_HEADER',
        description: 'The text for the "totalBytes" field header',
        defaultMessage: 'Size(GB)'
    },
    tagsCountHeader: {
        id: 'CONSEC_REPOSITORIES_TABLE_TAGS_HEADER',
        description: 'The text for the "lablesCount" field header',
        defaultMessage: 'Tags'
    },
    containerImagesNameHeader: {
        id: 'CONSEC_REPOSITORIES_CONTAINER_IMAGES_TABLE_NAME_HEADER',
        description: 'The text for the "Name" field header on the Container Images table',
        defaultMessage: 'Name'
    },
    containerTagsNameHeader: {
        id: 'CONSEC_REPOSITORIES_CONTAINER_TAGS_TABLE_NAME_HEADER',
        description: 'The text for the "Tag" field header on the Container Tags table',
        defaultMessage: 'Tag'
    },
    containerTagsTagCountMessage: {
        id: 'CONSEC_REPOSITORIES_CONTAINER_TAGS_TAG_COUNT_SUBHEADER',
        description: 'The text for the "Container Tags" subheader on the Container Tags table',
        defaultMessage: '{tagCount} Container Tags'
    }
});

export {
    tableMessages
};
