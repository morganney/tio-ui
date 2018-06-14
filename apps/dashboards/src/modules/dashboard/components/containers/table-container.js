import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { mapFilters } from './api/dashboard-api';
import {
    barGraphRenderer,
    textRenderer,
    getRowsProp,
    getColumnsProp,
    addSumIdFilters,
    addSumCveFilters
} from './api/table-api';

import { TableView } from '../presentations';
import { drillDown } from '../../actions';
import {
    DASHBOARD_DRILL_DOWN_PATH,
    DASHBOARD_DRILL_DOWN_SEARCH_TYPE,
    TOOL_TYPE
} from '../../constants';

class Table extends Component {
    static propTypes = {
        // Data fields
        visualization: PropTypes.object.isRequired,
        fetchingVisualizationData: PropTypes.bool.isRequired,
        match: PropTypes.object.isRequired,

        drillDown: PropTypes.func.isRequired
    };

    onItemClickedHandler = (item) => {
        const { match, visualization } = this.props;
        const selectedTool = visualization.definition.dataSource.query.tool;
        const query = {
            search: '',
            search_type: DASHBOARD_DRILL_DOWN_SEARCH_TYPE.AND,
            filters: mapFilters(visualization.definition.dataSource.query.filters)
        };
        const {
            VULNERABILITIES_PLUGINS,
            VULNERABILITIES_ASSETS,
            PLUGIN_DETAIL,
            ASSET_DETAIL
        } = DASHBOARD_DRILL_DOWN_PATH;
        const { SUM_ID, SUM_IP, SUM_CVE } = TOOL_TYPE;
        let url = `${match.url}${VULNERABILITIES_PLUGINS}`;

        switch (selectedTool) {
            case SUM_ID: {
                const pluginId = item.data.PluginID;

                query.filters = addSumIdFilters(query.filters, pluginId);
                url = `${url}/${pluginId}${PLUGIN_DETAIL}`;
                break;
            }
            case SUM_IP: {
                const assetUuid = visualization.data.nonDisplay.assetIds[item.rowIndex];

                url = `${match.url}${VULNERABILITIES_ASSETS}/${assetUuid}${ASSET_DETAIL}`;
                break;
            }
            case SUM_CVE: {
                query.filters = addSumCveFilters(query.filters, item.data.CVEID);
                break;
            }
        }

        this.props.drillDown(url, query);
    };

    render () {
        const { visualization, fetchingVisualizationData } = this.props;
        const rows = getRowsProp(visualization);
        const columns = getColumnsProp(visualization, textRenderer, barGraphRenderer);

        return (
            <TableView
                rows={rows}
                columns={columns}
                fetchingVisualizationData={fetchingVisualizationData}
                onCellClicked={this.onItemClickedHandler} />
        );
    }
}

const mapDispatchToProps = {
    drillDown
};

const TableContainer = withRouter(
    connect(null, mapDispatchToProps)(Table)
);

export {
    TableContainer
};
