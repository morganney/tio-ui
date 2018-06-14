import React from 'react';
import PropTypes from 'prop-types';
import { colors } from '@hivekit/core';
import { PageViewHeader } from '@hivekit/page-view';
import { ActionButton } from '@hivekit/button';
import {
    DesktopIcon,
    ExportIcon,
    SettingsIcon
} from '@hivekit/icon';

import { PLANE, PLANE_VIEW } from '../../constants';
import { DashboardDefaultComponent } from '../';

const DashboardHeaderView = ({
    dashboardData,
    isDashboardTemplate,
    showDashboardsIcon,
    toggleDashboardPlane,
    exportDashboard,
    updateDashboardTitle,
    configureText,
    exportText,
    myDashboardsText
}) => {
    const renderHeaderIcon = () => {
        return (
            <DashboardDefaultComponent
                baseIconColor={colors.white}
                iconSize={1} />
        );
    };
    const configureButton = <ActionButton
        key={0}
        data-tip={configureText}
        onClick={toggleDashboardPlane.bind(this, PLANE.DASHBOARD_SETTINGS, PLANE_VIEW.PARTIAL)}>
        <SettingsIcon />
    </ActionButton>;
    const exportButton = <ActionButton
        key={1}
        data-tip={exportText}
        onClick={exportDashboard}>
        <ExportIcon />
    </ActionButton>;
    const dashboardsButton = <ActionButton
        key={2}
        data-tip={myDashboardsText}
        onClick={toggleDashboardPlane.bind(
            this,
            { preview: PLANE.MY_DASHBOARDS, detail: PLANE.DASHBOARD_TEMPLATE_PREVIEW },
            PLANE_VIEW.PARTIAL)}>
        <DesktopIcon />
    </ActionButton>;
    let actionButtons = [configureButton, exportButton, dashboardsButton];

    if (isDashboardTemplate) {
        actionButtons = [dashboardsButton];
    }

    if (!showDashboardsIcon) {
        actionButtons = [];
    }

    return (
        <PageViewHeader
            actionButtons={actionButtons}
            titleIsEditable={!isDashboardTemplate}
            titleWasUpdated={updateDashboardTitle}
            title={dashboardData.name ? dashboardData.name : ''}
            titleIcon={renderHeaderIcon()} />
    );
};

DashboardHeaderView.propTypes = {
    dashboardData: PropTypes.object.isRequired,
    isDashboardTemplate: PropTypes.bool.isRequired,
    showDashboardsIcon: PropTypes.bool.isRequired,
    toggleDashboardPlane: PropTypes.func.isRequired,
    exportDashboard: PropTypes.func.isRequired,
    updateDashboardTitle: PropTypes.func.isRequired,

    configureText: PropTypes.string.isRequired,
    exportText: PropTypes.string.isRequired,
    myDashboardsText: PropTypes.string.isRequired
};

export {
    DashboardHeaderView
};
