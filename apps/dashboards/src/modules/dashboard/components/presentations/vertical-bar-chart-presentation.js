import React from 'react';
import PropTypes from 'prop-types';
import { VerticalBarChart } from '@hivekit/bar-chart';

const VerticalBarChartView = ({ data, legendComponent, onItemClickedHandler }) => {
    return (
        <VerticalBarChart
            data={data}
            legendComponent={legendComponent}
            onItemClicked={onItemClickedHandler} />
    );
};

VerticalBarChartView.propTypes = {
    data: PropTypes.array.isRequired,
    legendComponent: PropTypes.func.isRequired,
    onItemClickedHandler: PropTypes.func.isRequired
};

export {
    VerticalBarChartView
};
