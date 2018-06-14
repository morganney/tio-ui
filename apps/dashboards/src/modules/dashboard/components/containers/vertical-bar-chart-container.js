import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { mapFilters } from './api/dashboard-api';
import { getDataProp, getLegendComponentProp, getFilters } from './api/vertical-bar-chart-api';

import { VerticalBarChartView } from '../presentations';
import { drillDown } from '../../actions';
import { DASHBOARD_DRILL_DOWN_PATH, DASHBOARD_DRILL_DOWN_SEARCH_TYPE } from '../../constants';

class VerticalBarChart extends Component {
    static propTypes = {
        // Data fields
        visualization: PropTypes.object.isRequired,
        match: PropTypes.object.isRequired,

        drillDown: PropTypes.func.isRequired
    };

    onItemClickedHandler = (item) => {
        const { match, visualization } = this.props;
        const filters = mapFilters(getFilters(item, visualization));
        const query = {
            filters,
            search: '',
            search_type: DASHBOARD_DRILL_DOWN_SEARCH_TYPE.AND
        };

        this.props.drillDown(`${match.url}${DASHBOARD_DRILL_DOWN_PATH.VULNERABILITIES_PLUGINS}`, query);
    };

    render () {
        const { visualization } = this.props;
        const data = getDataProp(visualization);
        const legendComponent = getLegendComponentProp(visualization);

        return (
            <VerticalBarChartView
                data={data}
                legendComponent={legendComponent}
                onItemClickedHandler={this.onItemClickedHandler} />
        );
    }
}

const mapDispatchToProps = {
    drillDown
};

const VerticalBarChartContainer = withRouter(
    connect(null, mapDispatchToProps)(VerticalBarChart)
);

export {
    VerticalBarChartContainer
};
