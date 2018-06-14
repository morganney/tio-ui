import React from 'react';
import PropTypes from 'prop-types';

import { DashboardSettingsFilterComponent } from '../';
import { DashboardSettingsView } from '../presentations';

const DashboardSettingsViewSwitch = (props) => {
    return (
        <React.Fragment>
            {
                props.dashboardSettingsFilterPlaneOpened
                    ? <DashboardSettingsFilterComponent filterHeading={props.filterText} />
                    : props.dashboardData.name && <DashboardSettingsView {...props} />
            }
        </React.Fragment>
    );
};

DashboardSettingsViewSwitch.propTypes = {
    // Data fields
    dashboardSettingsFilterPlaneOpened: PropTypes.bool.isRequired,
    dashboardData: PropTypes.object.isRequired,

    // Dispatches
    updateDashboardTitle: PropTypes.func.isRequired,
    setAsDefaultDashboard: PropTypes.func.isRequired,
    openDashboardSettingsFilterPlane: PropTypes.func.isRequired,
    duplicateDashboard: PropTypes.func.isRequired,
    deleteDashboardAndRouteToDefault: PropTypes.func.isRequired,
    onWidgetClick: PropTypes.func.isRequired,

    // i18n messages
    filterText: PropTypes.string.isRequired,
    widgetsText: PropTypes.string.isRequired,
    setAsDefaultText: PropTypes.string.isRequired,
    duplicateText: PropTypes.string.isRequired,
    deleteText: PropTypes.string.isRequired
};

export {
    DashboardSettingsViewSwitch
};
