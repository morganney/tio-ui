import React from 'react';
import PropTypes from 'prop-types';
import { VerticalBarChart } from '@hivekit/bar-chart';
import { colors } from '@hivekit/core';

const onItemClickedHandler = () => {
    // TODO handle click once routing is in place (redirect to images)
};

const DashboardImagesByOsChartView = ({
    // State
    osData
}) => {
    // Helper functions
    const formatImagesData = () => {
        // Data points
        const colorSet = [
            colors.chartBlue,
            colors.chartBlueLight,
            colors.chartGreen,
            colors.chartGreenLight,
            colors.chartGreenLighter,
            colors.chartYellowGreen,
            colors.chartGold
        ];

        return osData.map((osObject, index) => {
            // Use modulus in case somehow we get more than 7 OSes, the colors will "wrap around"
            // The service is set to return 7 at most, however I want to pre-emptively avoid any array indexing errors
            return {
                ...osObject,
                color: colorSet[index % colorSet.length]
            };
        });
    };

    // Data points and props
    const barData = formatImagesData();
    const barProps = {
        onItemClicked: onItemClickedHandler,
        data: barData
    };

    // This won't ever be the case from a services-perspective.
    // This is moreso to not feed bad props (empty array) to VerticalBarChart before the API call finishes.
    if (!barData.length) {
        return null;
    }

    return (
        <VerticalBarChart {...barProps} />
    );
};

DashboardImagesByOsChartView.propTypes = {
    // State
    osData: PropTypes.array.isRequired
};

export {
    DashboardImagesByOsChartView
};
