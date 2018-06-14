import React from 'react';
import PropTypes from 'prop-types';

import { DashboardTemplatesComponent } from '../';
import { MyDashboardsView } from '../presentations';

const MyDashboardsViewSwitch = (props) => {
    return (
        <React.Fragment>
            {
                props.dashboardTemplatesPlaneDisplayOpened
                    ? <DashboardTemplatesComponent />
                    : <MyDashboardsView {...props} />
            }
        </React.Fragment>
    );
};

MyDashboardsViewSwitch.propTypes = {
    dashboards: PropTypes.array.isRequired,
    onListItemClick: PropTypes.func.isRequired,
    openDashboardTemplatesPlane: PropTypes.func.isRequired,
    dashboardTemplatesPlaneDisplayOpened: PropTypes.bool.isRequired
};

export {
    MyDashboardsViewSwitch
};
