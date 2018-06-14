import { defineMessages } from 'react-intl';

const headersMessages = defineMessages({
    pageHeader: {
        id: 'CONSEC_DASHBOARD_PAGE_HEADER',
        description: 'Header for the dashboard page',
        defaultMessage: 'Container Security'
    },
    imagesByOsHeader: {
        id: 'CONSEC_DASHBOARD_IMAGES_BY_OS_HEADER',
        description: 'Header for images by OS widget',
        defaultMessage: 'Images by OS'
    },
    connectorsHeader: {
        id: 'CONSEC_DASHBOARD_CONNECTORS_HEADER',
        description: 'Header for connectors widget',
        defaultMessage: 'Connectors'
    }
});

export { headersMessages };
