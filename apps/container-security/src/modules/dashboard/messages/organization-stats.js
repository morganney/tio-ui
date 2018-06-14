import { defineMessages } from 'react-intl';

const DashboardOrganizationStatsMessages = defineMessages({
    noOrganizationStatsData: {
        id: 'CONSEC_DASHBOARD_ORGANIZATION_STATS_NO_DATA',
        description: 'no organization stats data message',
        defaultMessage: 'No Organization Stats Data'
    },
    organizationStatsDataFetchError: {
        id: 'CONSEC_DASHBOARD_ORGANIZATION_STATS_DATA_ERROR',
        description: 'error fetching organization stats data',
        defaultMessage: 'Error fetching organization stats data'
    }
});

export {
    DashboardOrganizationStatsMessages
};
