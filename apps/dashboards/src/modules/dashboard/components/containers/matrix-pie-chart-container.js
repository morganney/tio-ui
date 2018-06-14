import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
    getDataProp,
    getLegendHeaderProp,
    getLegendItemsProp,
    getDescriptionHeaderProp,
    getDescriptionDetailProp,
    getPopoverContentProp
} from './api/matrix-pie-chart-api';

import { MatrixPieChartView } from '../presentations';

class MatrixPieChart extends Component {
    static propTypes = {
        // Data fields
        visualization: PropTypes.object.isRequired
    };

    render () {
        const { visualization } = this.props;
        const data = getDataProp(visualization);
        const legendHeader = getLegendHeaderProp(visualization);
        const legendItems = getLegendItemsProp(data);
        const descriptionHeader = getDescriptionHeaderProp(visualization);
        const descriptionDetail = getDescriptionDetailProp(visualization);
        const popoverContent = getPopoverContentProp(visualization);

        return (
            <MatrixPieChartView
                data={data}
                legendHeader={legendHeader}
                legendItems={legendItems}
                descriptionHeader={descriptionHeader}
                descriptionDetail={descriptionDetail}
                popoverContent={popoverContent} />
        );
    }
}

export {
    MatrixPieChart as MatrixPieChartContainer
};
