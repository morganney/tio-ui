import { defineMessages } from 'react-intl';

const ImagesDetailMessages = defineMessages({
    tabVulnerabilities: {
        id: 'IMAGES_DETAIL_TAB_VULNERABILITIES',
        description: 'tab title for vulnerabilities tab',
        defaultMessage: 'Vulnerabilities'
    },
    tabPackageInventory: {
        id: 'IMAGES_DETAIL_TAB_PACKAGE_INVENTORY',
        description: 'tab title for package inventory tab',
        defaultMessage: 'Package Inventory'
    },
    tabLayerDigest: {
        id: 'IMAGES_DETAIL_TAB_LAYER_DIGEST',
        description: 'tab title for layer digest tab',
        defaultMessage: 'Layer Digest'
    },
    tabMalware: {
        id: 'IMAGES_DETAIL_TAB_MALWARE',
        description: 'tab title for malware tab',
        defaultMessage: 'Malware'
    }
});

export {
    ImagesDetailMessages
};
