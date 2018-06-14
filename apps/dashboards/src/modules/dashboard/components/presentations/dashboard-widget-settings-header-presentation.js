import React from 'react';
import { PlanePreviewHeader, PlanePreviewHeaderView } from '@hivekit/plane';
import PropTypes from 'prop-types';
import { VulnerabilitiesIcon } from '@hivekit/icon';

const DashboardWidgetSettingsHeaderView = ({ widgetData, onTitleUpdate }) => {
    const contentComponent = (
        <PlanePreviewHeaderView
            title={widgetData.name}
            titleIsEditable={true}
            titleWasUpdated={onTitleUpdate}
            description={widgetData.description}
            descriptionIsEditable={false} />
    );

    return (
        <PlanePreviewHeader
            iconComponent={<VulnerabilitiesIcon />}
            contentComponent={contentComponent} />
    );
};

DashboardWidgetSettingsHeaderView.propTypes = {
    widgetData: PropTypes.object.isRequired,
    onTitleUpdate: PropTypes.func.isRequired
};

export {
    DashboardWidgetSettingsHeaderView
};
