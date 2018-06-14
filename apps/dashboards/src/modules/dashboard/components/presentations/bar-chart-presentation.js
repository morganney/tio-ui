import React from 'react';
import PropTypes from 'prop-types';
import { colors } from '@hivekit/core';
import { Container } from '@hivekit/container';
import { BarChart } from '@hivekit/bar-chart';

import { CHART_PALETTE } from '../../constants';

const BarChartView = ({ data, ticks, chartLegend }) => {
    return (
        <Container backgroundGradients={[colors.grayLight, 'transparent']} pt={2} pl={3}>
            <BarChart
                data={data}
                ticks={ticks}
                chartLegend={chartLegend}
                colors={CHART_PALETTE} />
        </Container>
    );
};

BarChartView.propTypes = {
    data: PropTypes.array.isRequired,
    ticks: PropTypes.array.isRequired,
    chartLegend: PropTypes.array.isRequired
};

export {
    BarChartView
};
