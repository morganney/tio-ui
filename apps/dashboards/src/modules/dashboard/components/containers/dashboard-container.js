import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { injectIntl } from 'react-intl';

import coreMessages from 'tio-app/messages';

import { getTileLayoutProp, getTileComponentsProp } from './api/dashboard-api';

import {
    BRANCH_NAME,
    STEM_NAME,
    DEFAULT_UUID
} from '../../constants';
import {
    fetchDashboardDataThenVisualizationData,
    toggleAndSetDashboardPlane,
    copyDashboardWidgetAndFetchDashboardData,
    setActiveDashboardWidget,
    resetVisualizationData,
    deleteDashboardWidgetAndFetchDashboardData,
    fetchTargetGroups
} from '../../actions';
import { dashboardWidgets } from '../../messages';
import { DashboardView } from '../presentations';

class Dashboard extends Component {
    static propTypes = {
        // Data fields
        dashboardData: PropTypes.object.isRequired,
        visualizationData: PropTypes.array.isRequired,
        fetchingVisualizationData: PropTypes.bool.isRequired,
        match: PropTypes.object.isRequired,
        targetGroups: PropTypes.array.isRequired,

        // Dispatches
        fetchAllDashboardData: PropTypes.func.isRequired,
        configureDashboardWidget: PropTypes.func,
        deleteDashboardWidget: PropTypes.func,
        copyDashboardWidget: PropTypes.func,
        resetDashboard: PropTypes.func.isRequired,
        cacheTargetGroups: PropTypes.func.isRequired
    };

    componentDidMount () {
        const { match, fetchAllDashboardData, resetDashboard, cacheTargetGroups } = this.props;
        const uuid = match.params.dashboardUuid ? match.params.dashboardUuid : DEFAULT_UUID;

        resetDashboard();
        fetchAllDashboardData(uuid);
        cacheTargetGroups();
    }

    componentDidUpdate (prevProps) {
        const { match, fetchAllDashboardData, resetDashboard } = this.props;
        const uuid = match.params.dashboardUuid ? match.params.dashboardUuid : DEFAULT_UUID;

        if (match.params.dashboardUuid !== prevProps.match.params.dashboardUuid) {
            resetDashboard();
            fetchAllDashboardData(uuid);
        }
    }

    render () {
        const {
            visualizationData,
            fetchingVisualizationData,
            targetGroups
        } = this.props;
        const tileLayout = getTileLayoutProp(visualizationData, targetGroups);
        const tileComponents = getTileComponentsProp(visualizationData, fetchingVisualizationData);

        return (
            <DashboardView
                {...this.props}
                tileLayout={tileLayout}
                tileComponents={tileComponents}
                dashboardFilterFormCancel={this.dashboardFilterFormCancel}
                dashboardFilterFormApply={this.dashboardFilterFormApply} />
        );
    }
}

const mapStateToProps = (state, props) => {
    const {
        dashboardData,
        visualizationData,
        fetchingVisualizationData,
        targetGroups
    } = state[BRANCH_NAME][STEM_NAME];
    const intl = props.intl;
    let isDashboardTemplate = false;

    if (dashboardData.uuid === dashboardData.tabTemplateUUID) {
        isDashboardTemplate = true;
    }

    return {
        dashboardData,
        visualizationData: visualizationData.data,
        fetchingVisualizationData,
        isDashboardTemplate,
        targetGroups,

        // i18n messages
        deleteDashboardWidgetHeading: intl.formatMessage(dashboardWidgets.deleteDashboardWidgetHeading),
        deleteDashboardWidgetConfirmation: intl.formatMessage(dashboardWidgets.deleteDashboardWidgetConfirmation),
        buttonCancel: intl.formatMessage(coreMessages.buttons.buttonCancel),
        buttonDelete: intl.formatMessage(coreMessages.buttons.buttonDelete)
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllDashboardData: (dashboardUuid) => {
            dispatch(fetchDashboardDataThenVisualizationData(dashboardUuid));
        },
        configureDashboardWidget: (widgetUuid) => {
            dispatch(setActiveDashboardWidget(widgetUuid));
        },
        deleteDashboardWidget: (dashboardUuid, widgetUuid) => {
            dispatch(deleteDashboardWidgetAndFetchDashboardData(dashboardUuid, widgetUuid));
        },
        copyDashboardWidget: (dashboardUuid, widgetUuid) => {
            dispatch(copyDashboardWidgetAndFetchDashboardData(dashboardUuid, widgetUuid));
        },
        toggleDashboardPlane: (view, planeView) => {
            dispatch(toggleAndSetDashboardPlane(planeView, view));
        },
        resetDashboard: () => {
            dispatch(resetVisualizationData());
        },
        cacheTargetGroups: () => {
            dispatch(fetchTargetGroups());
        }
    };
};

const DashboardContainer = withRouter(
    injectIntl(connect(mapStateToProps, mapDispatchToProps)(Dashboard))
);

export {
    DashboardContainer
};
