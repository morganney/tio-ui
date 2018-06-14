import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { mapFilters, addFilter, removeSeverity } from './api/dashboard-api';
import {
    getDataProp,
    getLegendItemsProp,
    getDescriptionHeader,
    getDescriptionDetail
} from './api/pie-chart-api';

import { PieChartView } from '../presentations';
import { drillDown } from '../../actions';
import {
    DASHBOARD_DRILL_DOWN_PATH,
    DASHBOARD_DRILL_DOWN_SEARCH_TYPE,
    TOOL_TYPE,
    VULN_API_FILTERS,
    NEW_FILTER_OPERATORS
} from '../../constants';

class PieChart extends Component {
    static propTypes = {
        // Data fields
        visualization: PropTypes.object.isRequired,
        match: PropTypes.object.isRequired,

        drillDown: PropTypes.func.isRequired
    };

    onItemClickedHandler = (item) => {
        const { match, visualization } = this.props;
        const filters = mapFilters(visualization.definition.dataSource.query.filters);
        const tool = visualization.definition.dataSource.query.tool;
        const query = {
            filters,
            search: '',
            search_type: DASHBOARD_DRILL_DOWN_SEARCH_TYPE.AND
        };
        const vulnPluginsPath = `${match.url}${DASHBOARD_DRILL_DOWN_PATH.VULNERABILITIES_PLUGINS}`;

        switch (tool) {
            case TOOL_TYPE.SUM_PORT:
                query.filters = filters.concat(addFilter(VULN_API_FILTERS.PORT, item.name));
                this.props.drillDown(vulnPluginsPath, query);
                break;
            case TOOL_TYPE.SUM_CVE:
                query.filters = filters.concat(
                    addFilter(VULN_API_FILTERS.CVE_ID, item.name, NEW_FILTER_OPERATORS.MATCH)
                );
                this.props.drillDown(vulnPluginsPath, query);
                break;
            case TOOL_TYPE.SUM_SEVERITY: {
                const updatedFilters = removeSeverity(filters);

                query.filters = updatedFilters.concat(addFilter(VULN_API_FILTERS.SEVERITY, item.name));
                this.props.drillDown(vulnPluginsPath, query);
                break;
            }
            case TOOL_TYPE.SUM_FAMILY:
                query.filters = filters.concat(addFilter(VULN_API_FILTERS.FAMILY_ID, item.name));
                this.props.drillDown(vulnPluginsPath, query);
                break;
            case TOOL_TYPE.SUM_IP: {
                const pathPrefix = `${match.url}${DASHBOARD_DRILL_DOWN_PATH.VULNERABILITIES_ASSETS}`;
                const pathSuffix = `${DASHBOARD_DRILL_DOWN_PATH.ASSET_DETAIL}`;

                this.props.drillDown(`${pathPrefix}/${item.name}${pathSuffix}`, query);
                break;
            }
            case TOOL_TYPE.SUM_ID: {
                const pathSuffix = `${DASHBOARD_DRILL_DOWN_PATH.PLUGIN_DETAIL}`;

                this.props.drillDown(`${vulnPluginsPath}/${item.name}${pathSuffix}`);
                break;
            }
        }
    };

    render () {
        const { visualization } = this.props;
        const data = getDataProp(visualization);
        const legendItems = getLegendItemsProp(data);
        const descriptionHeader = getDescriptionHeader(visualization);
        const descriptionDetail = getDescriptionDetail(visualization);

        return (
            <PieChartView
                data={data}
                legendItems={legendItems}
                descriptionHeader={descriptionHeader}
                descriptionDetail={descriptionDetail}
                onItemClickedHandler={this.onItemClickedHandler} />
        );
    }
}

const mapDispatchToProps = {
    drillDown
};

const PieChartContainer = withRouter(
    connect(null, mapDispatchToProps)(PieChart)
);

export {
    PieChartContainer
};
