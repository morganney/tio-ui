import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
    getDataProp,
    getChartLegendProp,
    getTicksProp
} from './api/bar-chart-api';

import { BarChartView } from '../presentations';

class BarChart extends Component {
    static propTypes = {
        // Data fields
        visualization: PropTypes.object.isRequired
    };

    render () {
        const { visualization } = this.props;
        const data = getDataProp(visualization);
        const ticks = getTicksProp(visualization);
        const chartLegend = getChartLegendProp();

        return (
            <BarChartView
                data={data}
                ticks={ticks}
                chartLegend={chartLegend}
            />
        );
    }
}

export {
    BarChart as BarChartContainer
};
