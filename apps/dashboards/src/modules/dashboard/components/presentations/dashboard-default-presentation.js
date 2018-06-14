import React from 'react';
import PropTypes from 'prop-types';
import { BadgeIcon, VulnerabilitiesIcon } from '@hivekit/icon';

const DashboardDefaultView = ({
    dashboardIsDefault,
    baseIconColor,
    iconSize
}) => {
    if (dashboardIsDefault) {
        return (
            <BadgeIcon
                icon={<VulnerabilitiesIcon />}
                color={baseIconColor}
                badgeIconStroke={baseIconColor}
                size={iconSize} />
        );
    }

    return (
        <VulnerabilitiesIcon
            color={baseIconColor}
            size={iconSize} />
    );
};

DashboardDefaultView.propTypes = {
    dashboardIsDefault: PropTypes.bool.isRequired,
    baseIconColor: PropTypes.string.isRequired,
    iconSize: PropTypes.number.isRequired
};

export {
    DashboardDefaultView
};
