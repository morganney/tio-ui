import React from 'react';
import PropTypes from 'prop-types';
import { colors } from '@hivekit/core';
import { PlanePreviewHeader, PlanePreviewHeaderView, PlanePreviewItem } from '@hivekit/plane';
import { FilterIcon } from '@hivekit/icon';

import { DashboardSettingsFilterFormComponent } from '../';

const DashboardSettingsFilterView = ({ filterHeading }) => {
    const contentComponent = (
        <PlanePreviewHeaderView
            title={filterHeading} />
    );

    return (
        <React.Fragment>
            <PlanePreviewItem>
                <PlanePreviewHeader
                    iconComponent={<FilterIcon color={colors.actionBlueDarkest} />}
                    contentComponent={contentComponent} />
            </PlanePreviewItem>
            <PlanePreviewItem>
                <DashboardSettingsFilterFormComponent />
            </PlanePreviewItem>
        </React.Fragment>
    );
};

DashboardSettingsFilterView.propTypes = {
    filterHeading: PropTypes.string.isRequired
};

export {
    DashboardSettingsFilterView
};
