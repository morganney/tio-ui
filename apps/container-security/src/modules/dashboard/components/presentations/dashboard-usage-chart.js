import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { RingChart } from '@hivekit/ring-chart';
import { colors } from '@hivekit/core';

import { DashboardUsageMessages } from 'tio-container-security/modules/dashboard/messages';

class DashboardUsageChartView extends Component {
    static propTypes = {
        organizationStats: PropTypes.object.isRequired,
        isOrganizationStatsFetching: PropTypes.bool.isRequired,
        dataFetchErrorMessage: PropTypes.string,
        noUsageDataMessage: PropTypes.string.isRequired,

        intl: PropTypes.object.isRequired
    }

    constructor () {
        super();

        this.parseUsageData = this.parseUsageData.bind(this);
    }

    parseUsageData (data) {
        const { mode, spaceUsed, spaceAvailable } = data.payload.spaceUsage;
        const maxEvalSpaceAvailable = 5;

        switch (mode) {
            case 'Eval':
                return this.formatChartData(spaceUsed, maxEvalSpaceAvailable - spaceUsed);
            default:
                return this.formatChartData(spaceUsed, spaceAvailable);
        }
    }

    formatChartData (used, available) {
        const { intl } = this.props;
        const { spaceUsed, spaceAvailable, usageDataGbDataLabel } = DashboardUsageMessages;
        const displayFixedToDecimal = 1;

        const percentageBase = 100;
        const maxSpaceAvailable = used + available;
        const formattedSpaceUsed = used.toFixed(displayFixedToDecimal);
        const formattedSpaceAvailable = available.toFixed(displayFixedToDecimal);
        const percentageSpaceUsed = Math.round(used / maxSpaceAvailable * percentageBase);
        const percentageSpaceAvailable = percentageBase - percentageSpaceUsed;

        const data = [
            { x: 1, y: percentageSpaceUsed, name: intl.formatMessage(spaceUsed), color: colors.chartBlue },
            { x: 2, y: percentageSpaceAvailable, name: intl.formatMessage(spaceAvailable), color: colors.graySemiLight }
        ];
        const legendData = [
            {
                value: intl.formatMessage(usageDataGbDataLabel, { gbData: formattedSpaceUsed }),
                description: intl.formatMessage(spaceUsed),
                color: colors.chartBlue
            },
            {
                value: intl.formatMessage(usageDataGbDataLabel, { gbData: formattedSpaceAvailable }),
                description: intl.formatMessage(spaceAvailable),
                color: colors.graySemiLight
            }
        ];

        return { data, legendData, percentageSpaceUsed };
    }

    render () {
        const {
            organizationStats,
            isOrganizationStatsFetching,
            dataFetchErrorMessage,
            noUsageDataMessage
        } = this.props;

        const { payload } = organizationStats;
        const successfulDataFetch = !isOrganizationStatsFetching && payload && payload.spaceUsage;
        const emptyOrErrorDataFetch = !isOrganizationStatsFetching && (dataFetchErrorMessage || !successfulDataFetch);

        if (successfulDataFetch) {
            const { data, legendData, percentageSpaceUsed } = this.parseUsageData(organizationStats);
            const description = `${percentageSpaceUsed}%`;

            return (
                <RingChart
                    data={data}
                    descriptionHeader={description}
                    legend={true}
                    legendItems={legendData} />
            );
        }

        if (emptyOrErrorDataFetch) {
            return (
                <RingChart
                    legendItems={[{ description: dataFetchErrorMessage || noUsageDataMessage }]}/>
            );
        }

        // TODO potentially implement loading state at some point
        return null;
    }
}

export {
    DashboardUsageChartView
};
