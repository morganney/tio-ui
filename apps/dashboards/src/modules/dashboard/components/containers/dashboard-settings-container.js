import React, { Component } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';

import coreMessages from 'tio-app/messages';

import { DashboardSettingsViewSwitch } from './';

import {
    BRANCH_NAME,
    STEM_NAME,
    PLANE_VIEW,
    PLANE
} from '../../constants';
import {
    editDashboardTitleAndDoPostRender,
    openDashboardSettingsFilterPlane,
    deleteDashboardAndRouteToDefault,
    setDefaultDashboardAndSetNotification,
    copyDashboardAndRouteToNewUuid,
    toggleDashboardPlane,
    fetchDefaultDashboard,
    setActiveDashboardWidget,
    toggleAndSetDashboardPlane
} from '../../actions';
import { messages } from '../../';

class DashboardSettings extends Component {
    static propTypes = {
        // Data Fields
        dashboardData: PropTypes.object.isRequired,
        dashboardSettingsFilterPlaneOpened: PropTypes.bool.isRequired,
        dashboardCopied: PropTypes.bool.isRequired,
        targetGroups: PropTypes.array.isRequired,

        // i18n messages
        widgetsText: PropTypes.string.isRequired,
        setAsDefaultText: PropTypes.string.isRequired,
        filterText: PropTypes.string.isRequired,
        duplicateText: PropTypes.string.isRequired,
        deleteText: PropTypes.string.isRequired,
        cancelText: PropTypes.string.isRequired,
        deleteDashboardHeading: PropTypes.string.isRequired,
        deleteDashboardConfirmation: PropTypes.string.isRequired,

        // Dispatches
        editDashboardTitle: PropTypes.func.isRequired,
        openDashboardSettingsFilterPlane: PropTypes.func.isRequired,
        setAsDefaultDashboard: PropTypes.func.isRequired,
        duplicateDashboard: PropTypes.func.isRequired,
        deleteDashboardAndRouteToDefault: PropTypes.func.isRequired,
        onWidgetClick: PropTypes.func.isRequired,
        getDefaultDashboard: PropTypes.func.isRequired
    };

    constructor () {
        super();

        this.updateDashboardTitle = this.updateDashboardTitle.bind(this);
    }

    componentDidUpdate () {
        this.props.getDefaultDashboard();
    }

    updateDashboardTitle (title) {
        const { dashboardData, editDashboardTitle } = this.props;

        // Only perform action if the title has actually been updated
        if (title !== dashboardData.name) {
            editDashboardTitle(dashboardData.uuid, title);
        }
    }

    render () {
        return (
            <DashboardSettingsViewSwitch
                {...this.props}
                updateDashboardTitle={this.updateDashboardTitle} />
        );
    }
}

const mapStateToProps = (state, props) => {
    const {
        dashboardData,
        dashboardSettingsFilterPlaneOpened,
        dashboardCopied,
        targetGroups
    } = state[BRANCH_NAME][STEM_NAME];
    const { intl } = props;
    const { buttonDelete, buttonCancel } = coreMessages.buttons;
    const { deleteDashboardHeading, deleteDashboardConfirmation } = messages.myDashboards;
    const {
        widgetsHeading,
        actionSetAsDefault,
        actionFilter,
        actionDuplicate
    } = messages.dashboardSettings;

    return {
        // props
        dashboardData,
        dashboardSettingsFilterPlaneOpened,
        dashboardCopied: dashboardCopied.success,
        targetGroups,

        // i18n messages
        widgetsText: intl.formatMessage(widgetsHeading),
        setAsDefaultText: intl.formatMessage(actionSetAsDefault),
        filterText: intl.formatMessage(actionFilter),
        duplicateText: intl.formatMessage(actionDuplicate),
        deleteText: intl.formatMessage(buttonDelete),
        cancelText: intl.formatMessage(buttonCancel),
        deleteDashboardHeading: intl.formatMessage(deleteDashboardHeading),
        deleteDashboardConfirmation: intl.formatMessage(deleteDashboardConfirmation)
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        editDashboardTitle: (uuid, title) => {
            dispatch(editDashboardTitleAndDoPostRender(uuid, title));
        },
        openDashboardSettingsFilterPlane: (isOpen) => {
            dispatch(openDashboardSettingsFilterPlane(isOpen));
        },
        setAsDefaultDashboard: (uuid) => {
            dispatch(setDefaultDashboardAndSetNotification(uuid));
        },
        duplicateDashboard: (uuid) => {
            dispatch(copyDashboardAndRouteToNewUuid(uuid));
        },
        deleteDashboardAndRouteToDefault: (uuid) => {
            dispatch(deleteDashboardAndRouteToDefault(uuid));
            dispatch(toggleDashboardPlane(PLANE_VIEW.CLOSED));
        },
        onWidgetClick: (widgetUuid) => {
            dispatch(setActiveDashboardWidget(widgetUuid));
            dispatch(toggleAndSetDashboardPlane(PLANE_VIEW.PARTIAL, PLANE.WIDGET_SETTINGS));
        },
        getDefaultDashboard: () => {
            dispatch(fetchDefaultDashboard());
        }
    };
};

const DashboardSettingsContainer = injectIntl(
    connect(mapStateToProps, mapDispatchToProps)(DashboardSettings)
);

export {
    DashboardSettingsContainer
};
