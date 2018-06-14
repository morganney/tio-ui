import React from 'react';
import PropTypes from 'prop-types';

import { DashboardSettingsWidgetComponent } from '../index';

const DashboardSettingsWidgetsView = ({
    dashboardWidgets,
    onWidgetConfigClick,
    targetGroups
}) => {
    return (
        <React.Fragment>
            {dashboardWidgets.map((widget, index) => {
                return (
                    <DashboardSettingsWidgetComponent
                        key={index}
                        widgetData={widget}
                        onItemClick={onWidgetConfigClick}
                        targetGroups={targetGroups} />
                );
            })}
        </React.Fragment>
    );
};

DashboardSettingsWidgetsView.propTypes = {
    dashboardWidgets: PropTypes.array.isRequired,
    onWidgetConfigClick: PropTypes.func.isRequired,
    targetGroups: PropTypes.array.isRequired
};

export {
    DashboardSettingsWidgetsView
};
