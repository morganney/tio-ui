import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { push } from 'react-router-redux';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import { injectIntl } from 'react-intl';

import coreMessages from 'tio-app/messages';
import {
    BRANCH_NAME as CORE_BRANCH_NAME,
    STEM_NAME as CORE_STEM_NAME
} from 'tio-app/modules/session/constants';

import { MyDashboardsViewSwitch } from './';

import { getMyDashboardsList, getMyProductDefaultDashboardsList } from './api/my-dashboards-api';

import { BRANCH_NAME, STEM_NAME, DASHBOARD_ROUTE_PATH, PLANE_VIEW } from '../../constants';
import {
    fetchMyDashboards,
    copyDashboardAndFetchMyDashboards,
    openDashboardTemplatesPlane,
    fetchDashboardTemplates,
    editDashboardTitleAndDoPostRender,
    toggleDashboardPlane,
    deleteDashboardAndFetchMyDashboards,
    deleteDashboardAndRouteToDefault,
    setDefaultDashboardAndSetNotification
} from '../../actions';
import { myDashboards } from '../../messages';

class MyDashboards extends Component {
    static propTypes = {
        // Data fields
        dashboards: PropTypes.array.isRequired,
        dashboardTemplatesPlaneDisplayOpened: PropTypes.bool.isRequired,

        // Dispatches
        fetchMyDashboards: PropTypes.func.isRequired,
        onListItemClick: PropTypes.func.isRequired,
        openDashboardTemplatesPlane: PropTypes.func.isRequired,
        deleteDashboardAndFetchMyDashboards: PropTypes.func.isRequired,
        match: PropTypes.object.isRequired
    };

    componentDidMount () {
        this.props.openDashboardTemplatesPlane(false);
        this.props.fetchMyDashboards();
    }

    render () {
        return (
            <MyDashboardsViewSwitch {...this.props} />
        );
    }
}

const mapStateToProps = (state, props) => {
    const {
        dashboards,
        dashboardTemplatesPlaneDisplayOpened,
        defaultDashboard
    } = state[BRANCH_NAME][STEM_NAME];

    const intl = props.intl;

    // TODO: derive these props using a selector once there is an established pattern - CI-21908
    const activeFeatures = state[CORE_BRANCH_NAME][CORE_STEM_NAME].activeFeatures;

    const myProductDefaultDashboardsList = getMyProductDefaultDashboardsList(activeFeatures, intl);
    const myDashboardsList = getMyDashboardsList(dashboards, defaultDashboard);
    const dashboardsList = myProductDefaultDashboardsList.concat(myDashboardsList);

    return {
        dashboards: dashboardsList,
        dashboardTemplatesPlaneDisplayOpened,

        // i18n messages
        deleteDashboardHeading: intl.formatMessage(myDashboards.deleteDashboardHeading),
        deleteDashboardConfirmation: intl.formatMessage(myDashboards.deleteDashboardConfirmation),
        buttonCancel: intl.formatMessage(coreMessages.buttons.buttonCancel),
        buttonDelete: intl.formatMessage(coreMessages.buttons.buttonDelete)
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchMyDashboards: () => {
            dispatch(fetchMyDashboards());
        },
        openDashboardTemplatesPlane: (openState) => {
            dispatch(fetchDashboardTemplates());
            dispatch(openDashboardTemplatesPlane(openState));
        },
        onListItemClick: (item) => {
            dispatch(toggleDashboardPlane(PLANE_VIEW.CLOSED));

            if (item.link) {
                dispatch(push(`${item.link}`));

                return;
            }

            dispatch(push(`${DASHBOARD_ROUTE_PATH}${item.id}`));
        },
        onRenameClick: (item) => {
            dispatch(editDashboardTitleAndDoPostRender(item.id, item.label, false));
        },
        deleteDashboardAndFetchMyDashboards: (uuid) => {
            if (uuid === ownProps.match.params.dashboardUuid) {
                dispatch(deleteDashboardAndRouteToDefault(uuid));
                dispatch(toggleDashboardPlane(PLANE_VIEW.CLOSED));

                return;
            }
            dispatch(deleteDashboardAndFetchMyDashboards(uuid));
        },
        onCopyClick: (id) => {
            dispatch(copyDashboardAndFetchMyDashboards(id));
        },
        onBookmarkClick: (item) => {
            dispatch(setDefaultDashboardAndSetNotification(item.id));
        }
    };
};

const MyDashboardsDragDrop = DragDropContext(HTML5Backend)(MyDashboards);

const MyDashboardsContainer = withRouter(
    injectIntl(connect(mapStateToProps, mapDispatchToProps)(MyDashboardsDragDrop))
);

export {
    MyDashboardsContainer
};
