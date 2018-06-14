import React from 'react';
import PropTypes from 'prop-types';
import { PlanePreviewItem } from '@hivekit/plane';

import {
    DashboardWidgetSettingsHeaderComponent,
    DashboardWidgetSettingsActionsComponent,
    DashboardSettingsFilterFormComponent
} from '../';

const DashboardWidgetSettingsView = ({
    dashboardData,
    widgetData,
    updateWidgetTitle,
    deleteDashboardWidget,
    duplicateDashboardWidget,
    deleteText,
    duplicateText
}) => {
    const deleteWidget = () => {
        deleteDashboardWidget(widgetData.uuid);
    };
    const copyWidget = () => {
        duplicateDashboardWidget(dashboardData.uuid, widgetData.uuid);
    };

    return (
        <React.Fragment>
            <PlanePreviewItem>
                <DashboardWidgetSettingsHeaderComponent
                    widgetData={widgetData}
                    onTitleUpdate={updateWidgetTitle} />
            </PlanePreviewItem>
            <DashboardWidgetSettingsActionsComponent
                deleteDashboardWidget={deleteWidget}
                duplicateDashboardWidget={copyWidget}
                deleteText={deleteText}
                duplicateText={duplicateText} />
            <PlanePreviewItem>
                <DashboardSettingsFilterFormComponent />
            </PlanePreviewItem>
        </React.Fragment>
    );
};

DashboardWidgetSettingsView.propTypes = {
    dashboardData: PropTypes.object.isRequired,
    widgetData: PropTypes.object.isRequired,
    updateWidgetTitle: PropTypes.func.isRequired,
    duplicateDashboardWidget: PropTypes.func.isRequired,
    deleteDashboardWidget: PropTypes.func.isRequired,
    duplicateText: PropTypes.string.isRequired,
    deleteText: PropTypes.string.isRequired
};

export {
    DashboardWidgetSettingsView
};
