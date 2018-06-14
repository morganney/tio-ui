import React from 'react';
import PropTypes from 'prop-types';
import { Plane } from '@hivekit/plane';
import { Button } from '@hivekit/button';
import { FormFooter } from '@hivekit/form';

import { PLANE } from '../../constants';

const DashboardPlaneView = ({
    dashboardPlaneDisplay,
    dashboardPlaneContent,
    onDashboardPlaneChange,
    showDashboardPlaneContent,
    showDashboardDetailPlaneContent,
    dashboardSettingsFilterPlaneOpened,
    dashboardFilterFormCancel,
    dashboardFilterFormApply
}) => {
    const renderFormFooter = () => {
        return (
            <FormFooter>
                <Button
                    mr={2}
                    onClick={dashboardFilterFormCancel}>
                    Cancel
                </Button>
                <Button
                    kind='primary'
                    onClick={dashboardFilterFormApply}>
                    Apply
                </Button>
            </FormFooter>
        );
    };

    return (
        <Plane
            onChange={onDashboardPlaneChange}
            preview={showDashboardPlaneContent}
            detail={showDashboardDetailPlaneContent}
            display={dashboardPlaneDisplay}
            previewFooter={
                dashboardSettingsFilterPlaneOpened || dashboardPlaneContent === PLANE.WIDGET_SETTINGS
                    ? renderFormFooter : false} />
    );
};

DashboardPlaneView.propTypes = {
    dashboardPlaneDisplay: PropTypes.string,
    dashboardPlaneContent: PropTypes.oneOfType([
        PropTypes.string.isRequired,
        PropTypes.object.isRequired
    ]),

    onDashboardPlaneChange: PropTypes.func.isRequired,
    showDashboardPlaneContent: PropTypes.func.isRequired,
    showDashboardDetailPlaneContent: PropTypes.func,
    dashboardSettingsFilterPlaneOpened: PropTypes.bool.isRequired,
    dashboardFilterFormCancel: PropTypes.func.isRequired,
    dashboardFilterFormApply: PropTypes.func.isRequired
};

export {
    DashboardPlaneView
};
