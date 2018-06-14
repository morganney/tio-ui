import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { submit } from 'redux-form';

import {
    MyDashboardsComponent,
    DashboardSettingsComponent,
    DashboardTemplatePreviewComponent,
    DashboardWidgetSettingsComponent
} from '../';
import { BRANCH_NAME, STEM_NAME, PLANE, PLANE_VIEW, REDUX_FORM_FILTER_DASHBOARD } from '../../constants';
import {
    toggleDashboardPlane,
    openDashboardSettingsFilterPlane,
    resetCopyDashboard,
    setActiveDashboardWidget
} from '../../actions';
import { DashboardPlaneView } from '../presentations';

class DashboardPlane extends Component {
    static propTypes = {
        // Data fields
        dashboardPlaneDisplay: PropTypes.string.isRequired,
        dashboardPlaneContent: PropTypes.oneOfType([
            PropTypes.string.isRequired,
            PropTypes.object.isRequired
        ]),
        dashboardSettingsFilterPlaneOpened: PropTypes.bool,

        // Dispatches
        onDashboardPlaneChange: PropTypes.func.isRequired,
        toggleDashboardPlane: PropTypes.func.isRequired,
        openDashboardSettingsFilterPlane: PropTypes.func.isRequired,
        dashboardFilterFormApply: PropTypes.func.isRequired
    };

    showDashboardPlaneContent = () => {
        const { dashboardPlaneDisplay, dashboardPlaneContent } = this.props;
        const components = {
            [PLANE.DASHBOARD_SETTINGS]: DashboardSettingsComponent,
            [PLANE.MY_DASHBOARDS]: MyDashboardsComponent,
            [PLANE.WIDGET_SETTINGS]: DashboardWidgetSettingsComponent
        };
        const key = (typeof dashboardPlaneContent === 'object') ? dashboardPlaneContent.preview : dashboardPlaneContent;
        const DynamicComponent = components[key];

        return (
            dashboardPlaneDisplay !== PLANE_VIEW.CLOSED ? <DynamicComponent /> : null
        );
    };

    showDashboardDetailPlaneContent = () => {
        const { dashboardPlaneDisplay, dashboardPlaneContent } = this.props;
        const components = {
            [PLANE.DASHBOARD_TEMPLATE_PREVIEW]: DashboardTemplatePreviewComponent
        };
        const key = (typeof dashboardPlaneContent === 'object') ? dashboardPlaneContent.detail : dashboardPlaneContent;
        const DynamicComponent = components[key];

        return (
            dashboardPlaneDisplay !== PLANE_VIEW.CLOSED ? <DynamicComponent /> : null
        );
    };

    dashboardFilterFormCancel = () => {
        const { dashboardPlaneContent } = this.props;

        if (dashboardPlaneContent === PLANE.WIDGET_SETTINGS) {
            this.props.toggleDashboardPlane(PLANE_VIEW.CLOSED);
        }

        this.props.openDashboardSettingsFilterPlane(false);
    };

    render () {
        const { dashboardPlaneContent } = this.props;

        return (
            <DashboardPlaneView
                {...this.props}
                showDashboardPlaneContent={this.showDashboardPlaneContent}
                showDashboardDetailPlaneContent={
                    typeof dashboardPlaneContent === 'object'
                        ? this.showDashboardDetailPlaneContent : null}
                dashboardFilterFormCancel={this.dashboardFilterFormCancel} />
        );
    }
}

const mapStateToProps = (state) => {
    const {
        dashboardPlaneDisplay,
        dashboardPlaneContent,
        dashboardSettingsFilterPlaneOpened
    } = state[BRANCH_NAME][STEM_NAME];

    return {
        dashboardPlaneDisplay,
        dashboardPlaneContent,
        dashboardSettingsFilterPlaneOpened
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onDashboardPlaneChange: (planeView) => {
            if (planeView !== PLANE_VIEW.PARTIAL && planeView !== PLANE_VIEW.FULL) {
                dispatch(toggleDashboardPlane(planeView));
                dispatch(setActiveDashboardWidget(null));
            }

            dispatch(resetCopyDashboard());
            dispatch(openDashboardSettingsFilterPlane(false));
        },
        toggleDashboardPlane: (planeView) => {
            dispatch(toggleDashboardPlane(planeView));
        },
        openDashboardSettingsFilterPlane: (isOpen) => {
            dispatch(openDashboardSettingsFilterPlane(isOpen));
        },
        dashboardFilterFormApply: () => {
            dispatch(submit(REDUX_FORM_FILTER_DASHBOARD));
        }
    };
};

const DashboardPlaneContainer = withRouter(
    connect(mapStateToProps, mapDispatchToProps)(DashboardPlane)
);

export {
    DashboardPlaneContainer
};
