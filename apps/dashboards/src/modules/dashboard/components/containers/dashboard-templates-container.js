import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { push } from 'react-router-redux';
import { injectIntl } from 'react-intl';

import { DashboardTemplatesView } from '../presentations';
import { BRANCH_NAME, STEM_NAME, DASHBOARD_ROUTE_PATH, PLANE_VIEW } from '../../constants';
import {
    resetVisualizationData,
    openDashboardTemplatesPlane,
    addDashboardTemplateAndFetchMyDashboards,
    toggleDashboardPlane,
    fetchDashboardTemplatePreview
} from '../../actions';

class DashboardTemplates extends Component {
    static propTypes = {
        // Data fields
        dashboardTemplates: PropTypes.array,
        notificationState: PropTypes.object,

        // Dispatches
        addDashboardTemplate: PropTypes.func.isRequired,
        match: PropTypes.object.isRequired,
        previewTemplate: PropTypes.func.isRequired,
        onListItemClick: PropTypes.func.isRequired,
        closeDashboardTemplatesPlane: PropTypes.func.isRequired
    };

    componentDidUpdate () {
        const { notificationState, onListItemClick, match, closeDashboardTemplatesPlane } = this.props;

        if (notificationState &&
            notificationState.payload.id &&
            match.params.dashboardUuid !== notificationState.payload.id) {
            closeDashboardTemplatesPlane();
            onListItemClick(notificationState.payload.id);
        }
    }

    render () {
        return (
            <DashboardTemplatesView {...this.props} />
        );
    }
}

const mapStateToProps = (state) => {
    const {
        dashboardTemplates,
        notificationState
    } = state[BRANCH_NAME][STEM_NAME];

    return {
        dashboardTemplates,
        notificationState
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onListItemClick: (uuid) => {
            dispatch(resetVisualizationData());
            dispatch(push(`${DASHBOARD_ROUTE_PATH}${uuid}`));
            dispatch(toggleDashboardPlane(PLANE_VIEW.PARTIAL));
        },
        closeDashboardTemplatesPlane: () => {
            dispatch(openDashboardTemplatesPlane(false));
        },
        addDashboardTemplate: (uuid) => {
            dispatch(addDashboardTemplateAndFetchMyDashboards(uuid));
        },
        previewTemplate: (uuid, view, planeView) => {
            dispatch(fetchDashboardTemplatePreview(uuid));
            dispatch(toggleDashboardPlane(planeView));
        }
    };
};

const DashboardTemplatesContainer = withRouter(
    injectIntl(connect(mapStateToProps, mapDispatchToProps)(DashboardTemplates))
);

export {
    DashboardTemplatesContainer
};
