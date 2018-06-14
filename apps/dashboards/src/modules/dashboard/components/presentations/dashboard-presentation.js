import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@hivekit/button';
import { TileLayout } from '@hivekit/tile';
import { PageView } from '@hivekit/page-view';
import { Notification, NotificationActionBar, ShowNotification } from '@hivekit/notification';

import { Renderer as TioVmRenderer } from 'tio-vm/renderer';

import { DashboardHeaderComponent, DashboardPlaneComponent } from '../';
import { PLANE, PLANE_VIEW } from '../../constants';

const DashboardView = ({
    dashboardData,
    isDashboardTemplate,
    toggleDashboardPlane,
    tileLayout,
    tileComponents,
    configureDashboardWidget,
    copyDashboardWidget,
    deleteDashboardWidget,
    deleteDashboardWidgetHeading,
    deleteDashboardWidgetConfirmation,
    buttonCancel,
    buttonDelete,
    match
}) => {
    const onConfigureTile = (index) => {
        configureDashboardWidget(tileLayout[index].custom.uuid);
        toggleDashboardPlane(PLANE.WIDGET_SETTINGS, PLANE_VIEW.PARTIAL);
    };
    const onDuplicateTile = (index) => {
        copyDashboardWidget(dashboardData.uuid, tileLayout[index].custom.uuid);
    };
    const onRemoveTile = (index) => {
        const deleteDashboard = () => {
            deleteDashboardWidget(dashboardData.uuid, tileLayout[index].custom.uuid);
        };

        ShowNotification(
            <Notification
                status='medium'
                title={deleteDashboardWidgetHeading}
                message={deleteDashboardWidgetConfirmation}
                actions={(<NotificationActionBar>
                    <Button kind='tertiary'>
                        {buttonCancel}
                    </Button>
                    <Button kind='primary' onClick={deleteDashboard}>
                        {buttonDelete}
                    </Button>
                </NotificationActionBar>)} />,
            {
                autoClose: false
            }
        );
    };

    return (
        <PageView
            header={
                <DashboardHeaderComponent
                    toggleDashboardPlane={toggleDashboardPlane}
                    isDashboardTemplate={isDashboardTemplate}
                />}
            content={
                <div style={{ width: '100%' }}>
                    <TileLayout
                        layout={tileLayout}
                        isDraggable={!isDashboardTemplate}
                        onConfigureTile={isDashboardTemplate ? null : onConfigureTile}
                        onDuplicateTile={isDashboardTemplate ? null : onDuplicateTile}
                        onRemoveTile={isDashboardTemplate ? null : onRemoveTile}>
                        {tileComponents}
                    </TileLayout>
                    <DashboardPlaneComponent />
                    <TioVmRenderer match={match} skipNotFound={true} />
                </div>
            }
        />
    );
};

DashboardView.propTypes = {
    // Data fields
    dashboardData: PropTypes.object.isRequired,
    tileLayout: PropTypes.array.isRequired,
    tileComponents: PropTypes.array.isRequired,
    isDashboardTemplate: PropTypes.bool.isRequired,
    match: PropTypes.object.isRequired,

    // Dispatches
    toggleDashboardPlane: PropTypes.func.isRequired,
    configureDashboardWidget: PropTypes.func,
    deleteDashboardWidget: PropTypes.func,
    copyDashboardWidget: PropTypes.func,

    // i18n messages
    deleteDashboardWidgetHeading: PropTypes.string.isRequired,
    deleteDashboardWidgetConfirmation: PropTypes.string.isRequired,
    buttonCancel: PropTypes.string.isRequired,
    buttonDelete: PropTypes.string.isRequired
};

export {
    DashboardView
};
