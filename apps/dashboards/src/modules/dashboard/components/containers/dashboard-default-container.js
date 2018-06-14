import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
    BRANCH_NAME,
    STEM_NAME
} from '../../constants';
import { fetchDefaultDashboard } from '../../actions';
import { DashboardDefaultView } from '../presentations';

class DashboardDefault extends Component {
    static propTypes = {
        // Data fields
        dashboardIsDefault: PropTypes.bool.isRequired,
        baseIconColor: PropTypes.string.isRequired,
        iconSize: PropTypes.number.isRequired,

        // Dispatches
        getDefaultDashboard: PropTypes.func.isRequired
    }

    componentDidMount () {
        this.props.getDefaultDashboard();
    }

    render () {
        const { dashboardIsDefault, baseIconColor, iconSize } = this.props;

        return (
            <DashboardDefaultView
                dashboardIsDefault={dashboardIsDefault}
                baseIconColor={baseIconColor}
                iconSize={iconSize} />
        );
    }
}

const mapStateToProps = (state) => {
    const { defaultDashboard, dashboardData } = state[BRANCH_NAME][STEM_NAME];

    return {
        dashboardIsDefault: defaultDashboard === dashboardData.uuid
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getDefaultDashboard: () => {
            dispatch(fetchDefaultDashboard());
        }
    };
};

const DashboardDefaultContainer = connect(mapStateToProps, mapDispatchToProps)(DashboardDefault);

export {
    DashboardDefaultContainer
};
