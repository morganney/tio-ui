import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { mapFilters } from './api/dashboard-api';

import { MatrixCellView } from '../presentations';
import { drillDown } from '../../actions';
import { DASHBOARD_DRILL_DOWN_PATH, DASHBOARD_DRILL_DOWN_SEARCH_TYPE } from '../../constants';

class MatrixCell extends Component {
    static propTypes = {
        // Data fields
        value: PropTypes.string.isRequired,
        color: PropTypes.string.isRequired,
        background: PropTypes.string.isRequired,
        backgroundHover: PropTypes.string,
        popover: PropTypes.object,
        def: PropTypes.object.isRequired,
        match: PropTypes.object.isRequired,

        // Dispatches
        drillDown: PropTypes.func.isRequired
    };

    onItemClickedHandler = () => {
        const { match, def } = this.props;
        const filters = mapFilters(def.dataSource.query.filters);
        const query = {
            filters,
            search: '',
            search_type: DASHBOARD_DRILL_DOWN_SEARCH_TYPE.AND
        };

        this.props.drillDown(`${match.url}${DASHBOARD_DRILL_DOWN_PATH.VULNERABILITIES_PLUGINS}`, query);
    };

    render () {
        const { value, color, background, backgroundHover, popover } = this.props;

        return (
            <MatrixCellView
                value={value}
                color={color}
                background={background}
                backgroundHover={backgroundHover}
                popover={popover}
                onItemClickedHandler={this.onItemClickedHandler} />
        );
    }
}

const mapDispatchToProps = {
    drillDown
};

const MatrixCellContainer = withRouter(
    connect(null, mapDispatchToProps)(MatrixCell)
);

export {
    MatrixCellContainer
};
