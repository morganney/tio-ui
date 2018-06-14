import { defineMessages } from 'react-intl';

const myDashboardsMessages = defineMessages({
    myDashboardsTitle: {
        id: 'DASHBOARDS_MY_DASHBOARDS_TITLE',
        description: 'Text for my dashboards title',
        defaultMessage: 'Dashboards'
    },
    deleteDashboardHeading: {
        id: 'DASHBOARDS_DELETE_DASHBOARD_HEADING',
        description: 'Heading for the notification, when you attempt to delete a dashboard.',
        defaultMessage: 'Confirm Deletion'
    },
    deleteDashboardConfirmation: {
        id: 'DASHBOARDS_DELETE_DASHBOARD_CONFIRMATION',
        description: 'Question in the notification, when you attempt to delete a dashboard.',
        defaultMessage: 'Are you sure you wish to delete this Dashboard?'
    },
    luminDashboardTitle: {
        id: 'DASHBOARDS_LUMIN_DASHBOARD_TITLE',
        description: 'Text for my Lumin dashboard title',
        defaultMessage: 'Lumin'
    },
    vulnerabilityManagementDashboardTitle: {
        id: 'DASHBOARDS_VULNERABILITY_MANAGEMENT_DASHBOARD_TITLE',
        description: 'Text for Vulnerability Management title',
        defaultMessage: 'Vulnerability Management'
    },
    containerSecurityDashboardTitle: {
        id: 'DASHBOARDS_CONTAINER_SECURITY_DASHBOARD_TITLE',
        description: 'Text for Container Security title',
        defaultMessage: 'Container Security'
    },
    webappScanningDashboardTitle: {
        id: 'DASHBOARDS_WEBAPP_SCANNING_DASHBOARD_TITLE',
        description: 'Text for Webapp Scanning dashboard title',
        defaultMessage: 'Web Application Scanning'
    }
});

export {
    myDashboardsMessages
};
