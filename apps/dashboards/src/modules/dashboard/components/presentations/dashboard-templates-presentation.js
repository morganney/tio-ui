import React from 'react';
import PropTypes from 'prop-types';
import { PlanePreviewHeader, PlanePreviewHeaderView, PlanePreviewItem } from '@hivekit/plane';
import { DesktopIcon, VulnerabilitiesIcon, AddIcon } from '@hivekit/icon';
import { MenuGroup, MenuItem } from '@hivekit/menu';
import { Button } from '@hivekit/button';
import { intlShape } from 'react-intl';

import { PLANE, PLANE_VIEW } from '../../constants';
import { dashboardTemplates as tplMsg } from '../../messages';

const DashboardTemplatesView = ({
    dashboardTemplates,
    intl,
    addDashboardTemplate,
    previewTemplate
}) => {
    const contentComponent = (
        <PlanePreviewHeaderView
            title={intl.formatMessage(tplMsg.dashboardTemplatesTitle)}
            titleIsEditable={false}
            titleWasUpdated={null}
            descriptionExpandable={false}
            description={intl.formatMessage(tplMsg.dashboardTemplatesInstructions)} />
    );

    return (
        <PlanePreviewItem>
            <PlanePreviewHeader
                contentComponent={contentComponent}
                iconComponent={<DesktopIcon />} />
            <MenuGroup
                title={intl.formatMessage(tplMsg.dashboardTemplatesVulnerabilityManagement)}
                icon={<VulnerabilitiesIcon size={3} />}>
                {
                    dashboardTemplates.map((item) => {
                        return (
                            <MenuItem
                                key={item.uuid}
                                button={
                                    <Button onClick={addDashboardTemplate.bind(this, item.uuid)}>
                                        <AddIcon
                                            data-tip={
                                                intl.formatMessage(tplMsg.dashboardTemplatesAddToDashboards)
                                            } />
                                    </Button>}
                                onClick={previewTemplate.bind(
                                    this,
                                    item.uuid,
                                    PLANE.MY_DASHBOARDS,
                                    PLANE_VIEW.FULL)}>
                                {item.name}
                            </MenuItem>
                        );
                    })
                }
            </MenuGroup>
        </PlanePreviewItem>
    );
};

DashboardTemplatesView.propTypes = {
    dashboardTemplates: PropTypes.array.isRequired,
    intl: intlShape.isRequired,
    addDashboardTemplate: PropTypes.func.isRequired,
    previewTemplate: PropTypes.func.isRequired
};

export {
    DashboardTemplatesView
};
