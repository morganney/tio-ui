import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@hivekit/button';
import { colors } from '@hivekit/core';
import { H6 } from '@hivekit/header';
import { Flex, Box } from '@hivekit/layout';
import { Notification, NotificationActionBar, ShowNotification } from '@hivekit/notification';
import { PlanePreviewItem } from '@hivekit/plane';

import {
    DashboardSettingsHeaderComponent,
    DashboardSettingsActionsComponent,
    DashboardSettingsWidgetsComponent
} from '../';

const DashboardSettingsView = ({
    dashboardData,
    updateDashboardTitle,
    setAsDefaultDashboard,
    openDashboardSettingsFilterPlane,
    duplicateDashboard,
    dashboardCopied,
    deleteDashboardAndRouteToDefault,
    onWidgetClick,
    widgetsText,
    setAsDefaultText,
    filterText,
    duplicateText,
    deleteText,
    cancelText,
    deleteDashboardHeading,
    deleteDashboardConfirmation,
    targetGroups
}) => {
    const { uuid } = dashboardData;
    const copyDashboard = () => {
        duplicateDashboard(uuid);
    };
    const promptForDelete = () => {
        const deleteDashboard = () => {
            deleteDashboardAndRouteToDefault(uuid);
        };

        ShowNotification(
            <Notification
                status='medium'
                title={deleteDashboardHeading}
                message={deleteDashboardConfirmation}
                actions={(<NotificationActionBar>
                    <Button kind='tertiary'>
                        {cancelText}
                    </Button>
                    <Button kind='primary' onClick={deleteDashboard}>
                        {deleteText}
                    </Button>
                </NotificationActionBar>)} />,
            {
                autoClose: false
            }
        );
    };

    return (
        <React.Fragment>
            <PlanePreviewItem>
                <DashboardSettingsHeaderComponent
                    dashboardData={dashboardData}
                    onTitleUpdate={updateDashboardTitle}
                    dashboardCopied={dashboardCopied} />
            </PlanePreviewItem>
            <DashboardSettingsActionsComponent
                dashboardData={dashboardData}
                setAsDefaultDashboard={setAsDefaultDashboard}
                filterDashboard={openDashboardSettingsFilterPlane.bind(this, true)}
                duplicateDashboard={copyDashboard}
                deleteDashboard={promptForDelete}
                setAsDefaultText={setAsDefaultText}
                filterText={filterText}
                duplicateText={duplicateText}
                deleteText={deleteText} />
            <PlanePreviewItem>
                <Flex
                    width='100%'
                    align='center'>
                    <Box py={2}>
                        <H6 color={colors.grayDark}>{widgetsText}</H6>
                    </Box>
                    <Box>
                        <DashboardSettingsWidgetsComponent
                            dashboardWidgets={dashboardData.components}
                            onWidgetConfigClick={onWidgetClick}
                            targetGroups={targetGroups} />
                    </Box>
                </Flex>
            </PlanePreviewItem>
        </React.Fragment>
    );
};

DashboardSettingsView.propTypes = {
    // data fields
    dashboardData: PropTypes.object.isRequired,
    dashboardCopied: PropTypes.bool.isRequired,
    targetGroups: PropTypes.array.isRequired,

    // dispatches
    updateDashboardTitle: PropTypes.func.isRequired,
    setAsDefaultDashboard: PropTypes.func.isRequired,
    openDashboardSettingsFilterPlane: PropTypes.func.isRequired,
    duplicateDashboard: PropTypes.func.isRequired,
    deleteDashboardAndRouteToDefault: PropTypes.func.isRequired,
    onWidgetClick: PropTypes.func.isRequired,

    // il8n messages
    widgetsText: PropTypes.string.isRequired,
    setAsDefaultText: PropTypes.string.isRequired,
    filterText: PropTypes.string.isRequired,
    duplicateText: PropTypes.string.isRequired,
    deleteText: PropTypes.string.isRequired,
    cancelText: PropTypes.string.isRequired,
    deleteDashboardHeading: PropTypes.string.isRequired,
    deleteDashboardConfirmation: PropTypes.string.isRequired
};

export {
    DashboardSettingsView
};
