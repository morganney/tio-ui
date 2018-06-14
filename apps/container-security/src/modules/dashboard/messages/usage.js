import { defineMessages } from 'react-intl';

const DashboardUsageMessages = defineMessages({
    spaceUsed: {
        id: 'CONSEC_DASHBOARD_USAGE_SPACE_USED',
        description: 'spaced used label text',
        defaultMessage: 'Used'
    },
    spaceAvailable: {
        id: 'CONSEC_DASHBOARD_USAGE_SPACE_AVAILABLE',
        description: 'space available label text',
        defaultMessage: 'Available'
    },
    usageDataGbDataLabel: {
        id: 'CONSEC_DASHBOARD_USAGE_DATA_LABEL',
        description: 'usage data label',
        defaultMessage: '{gbData}GB'
    },
    noUsageData: {
        id: 'CONSEC_DASHBOARD_USAGE_NO_DATA',
        description: 'no usage data message',
        defaultMessage: 'No Usage Data'
    },
    usageComponentHeader: {
        id: 'CONSEC_DASHBOARD_USAGE_HEADER',
        description: 'title for dashboard usage component',
        defaultMessage: 'Usage'
    }
});

export {
    DashboardUsageMessages
};
