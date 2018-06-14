import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

import { BRANCH_NAME, STEM_NAME } from 'tio-container-security/modules/dashboard/constants';
import {
    DashboardUsageMessages,
    DashboardOrganizationStatsMessages
} from 'tio-container-security/modules/dashboard/messages';

import { DashboardUsageChartLifecycles } from './lifecycles';

const mapStateToProps = (state, props) => {
    const {
        organizationStats,
        isOrganizationStatsFetching,
        organizationStatsError
    } = state[BRANCH_NAME][STEM_NAME];
    const { intl } = props;
    const { noUsageData } = DashboardUsageMessages;

    // il8n messages
    const noUsageDataMessage = intl.formatMessage(noUsageData);

    let dataFetchErrorMessage = null;

    if (typeof organizationStatsError === 'string') {
        dataFetchErrorMessage = intl.formatMessage(DashboardOrganizationStatsMessages[organizationStatsError]);
    }

    return {
        // State
        organizationStats,
        isOrganizationStatsFetching,

        // Messages
        noUsageDataMessage,
        dataFetchErrorMessage
    };
};

const mapDispatchToProps = null;

const DashboardUsageChartContainer = injectIntl(
    connect(mapStateToProps, mapDispatchToProps)(DashboardUsageChartLifecycles)
);

export {
    DashboardUsageChartContainer
};
