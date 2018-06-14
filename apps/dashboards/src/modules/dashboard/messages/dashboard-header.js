import { defineMessages } from 'react-intl';

const dashboardHeaderMessages = defineMessages({
    configureDashboardIcon: {
        id: 'DASHBOARDS_CONFIGURE_DASHBOARD_ICON',
        description: 'Text for configure dashboard icon',
        defaultMessage: 'Dashboard Settings'
    },
    exportDashboardIcon: {
        id: 'DASHBOARDS_EXPORT_DASHBOARD_ICON',
        description: 'Text for export dashboard icon',
        defaultMessage: 'Exports'
    },
    myDashboardsIcon: {
        id: 'DASHBOARDS_MY_DASHBOARDS_ICON',
        description: 'Text for my dashboards icon',
        defaultMessage: 'Dashboards'
    }
});

export {
    dashboardHeaderMessages
};
