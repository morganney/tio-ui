import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import {
    getHeadingsProp,
    getDataProp,
    getLabelsProp,
    getDefinitionsProp
} from './api/stats-matrix-api';
import { mapFilters } from './api/dashboard-api';

import { StatsMatrixView } from '../presentations';
import { drillDown } from '../../actions';
import { DASHBOARD_DRILL_DOWN_PATH, TOOL_TYPE, DASHBOARD_DRILL_DOWN_SEARCH_TYPE } from '../../constants';

class StatsMatrix extends Component {
    static propTypes = {
        // Data fields
        visualization: PropTypes.object.isRequired,
        match: PropTypes.object.isRequired,

        drillDown: PropTypes.func.isRequired
    };

    onItemClickedHandler = (def) => {
        const { match } = this.props;
        const tool = def.tool;
        const filters = mapFilters(def.filters);
        const query = {
            filters,
            search: '',
            search_type: DASHBOARD_DRILL_DOWN_SEARCH_TYPE.AND
        };

        if (tool === TOOL_TYPE.VULN_COUNT) {
            this.props.drillDown(`${match.url}${DASHBOARD_DRILL_DOWN_PATH.VULNERABILITIES_PLUGINS}`, query);
        } else if (tool === TOOL_TYPE.HOST_COUNT) {
            this.props.drillDown(`${match.url}${DASHBOARD_DRILL_DOWN_PATH.VULNERABILITIES_ASSETS}`, query);
        }
    };

    render () {
        const { visualization } = this.props;
        const headings = getHeadingsProp(visualization);
        const data = getDataProp(visualization);
        const labels = getLabelsProp(visualization);
        const definitions = getDefinitionsProp(visualization);

        return (
            <StatsMatrixView
                headings={headings}
                data={data}
                labels={labels}
                definitions={definitions}
                onCellClick={this.onItemClickedHandler}
            />
        );
    }
}

const mapDispatchToProps = {
    drillDown
};

const StatsMatrixContainer = withRouter(
    connect(null, mapDispatchToProps)(StatsMatrix)
);

export {
    StatsMatrixContainer
};
