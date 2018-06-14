import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import {
    DashboardUsageMessages,
    DashboardStatisticsMessages,
    headersMessages
} from 'tio-container-security/modules/dashboard/messages';
import { fetchOrganizationStats } from 'tio-container-security/modules/dashboard/actions';

import { DashboardLifecycles } from './lifecycles';

const mapStateToProps = (state, props) => {
    const { intl } = props;
    const { usageComponentHeader } = DashboardUsageMessages;
    const { statsComponentHeader } = DashboardStatisticsMessages;

    // il8n messages
    const usageHeaderMessage = intl.formatMessage(usageComponentHeader);
    const statisticsHeaderMessage = intl.formatMessage(statsComponentHeader);

    // Message translation
    const {
        pageHeader,
        imagesByOsHeader,
        connectorsHeader
    } = headersMessages;

    return {
        usageHeaderMessage,
        statisticsHeaderMessage,

        // i18n messages
        imagesByOsHeaderText: intl.formatMessage(imagesByOsHeader),
        connectorsHeaderText: intl.formatMessage(connectorsHeader),
        pageHeaderText: intl.formatMessage(pageHeader)
    };
};

const mapDispatchToProps = {
    fetchOrganizationStats
};

const DashboardContainer = compose(
    injectIntl,
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(DashboardLifecycles);

export {
    DashboardContainer
};
