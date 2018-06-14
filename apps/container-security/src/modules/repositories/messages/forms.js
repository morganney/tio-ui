import { defineMessages } from 'react-intl';

const formMessages = defineMessages({
    repositoriesContainerImagesIcon: {
        id: 'CONSEC_REPOSITORIES_DRILLDOWN_CONTAINER_IMAGES_ICON_LABEL',
        description: 'The text for the label in the repositories drilldown, for the Container Images icon.',
        defaultMessage: 'CONTAINER IMAGES'
    },
    repositoriesTagsIcon: {
        id: 'CONSEC_REPOSITORIES_DRILLDOWN_TAGS_ICON_LABEL',
        description: 'The text for the label in the repositories drilldown, for the Tags icon.',
        defaultMessage: 'TAGS'
    },
    vulnerabilitiesLabel: {
        id: 'CONSEC_REPOSITORIES_DRILLDOWN_SUMMARY_VULNERABILITIES_LABEL',
        description: 'The text for the label in the repositories drilldown, for the Vulnerabilities summary info.',
        defaultMessage: 'VULNERABILITIES'
    },
    malwareLabel: {
        id: 'CONSEC_REPOSITORIES_DRILLDOWN_SUMMARY_MALWARE_LABEL',
        description: 'The text for the label in the repositories drilldown, for the Malware summary info.',
        defaultMessage: 'MALWARE'
    },
    pushesLabel: {
        id: 'CONSEC_REPOSITORIES_DRILLDOWN_SUMMARY_PUSHES_LABEL',
        description: 'The text for the label in the repositories drilldown, for the Push summary info.',
        defaultMessage: 'PUSHES'
    },
    pullsLabel: {
        id: 'CONSEC_REPOSITORIES_DRILLDOWN_SUMMARY_PULLS_LABEL',
        description: 'The text for the label in the repositories drilldown, for the Pull summary info.',
        defaultMessage: 'PULLS'
    },
    sizeLabel: {
        id: 'CONSEC_REPOSITORIES_DRILLDOWN_SUMMARY_SIZE_LABEL',
        description: 'The text for the label in the repositories drilldown, for the Size summary info.',
        defaultMessage: 'SIZE (GB)'
    }
});

export {
    formMessages
};
