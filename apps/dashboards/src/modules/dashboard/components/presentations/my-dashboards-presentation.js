import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { PlanePreviewHeader, PlanePreviewHeaderView, PlanePreviewItem } from '@hivekit/plane';
import { DesktopIcon } from '@hivekit/icon';
import { GroupableList } from '@hivekit/groupable-list';
import { Notification, NotificationActionBar, ShowNotification } from '@hivekit/notification';
import { Button } from '@hivekit/button';

import { myDashboards } from '../../messages';

const MyDashboardsView = ({
    dashboards,
    onListItemClick,
    onRenameClick,
    onCopyClick,
    onBookmarkClick,
    deleteDashboardAndFetchMyDashboards,
    openDashboardTemplatesPlane,
    deleteDashboardHeading,
    deleteDashboardConfirmation,
    buttonCancel,
    buttonDelete
}) => {
    const contentComponent = (
        <FormattedMessage {...myDashboards.myDashboardsTitle}>
            {(dashboardTitle) => {
                return (
                    <PlanePreviewHeaderView
                        title={dashboardTitle}
                        titleIsEditable={false}
                        titleWasUpdated={null}
                        addActionHandler={openDashboardTemplatesPlane.bind(this, true)} />
                );
            }}
        </FormattedMessage>
    );

    function promptForDelete (uuid) {
        const deleteDashboard = () => {
            deleteDashboardAndFetchMyDashboards(uuid);
        };

        ShowNotification(
            <Notification
                status='medium'
                title={deleteDashboardHeading}
                message={deleteDashboardConfirmation}
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
    }

    return (
        <PlanePreviewItem>
            <PlanePreviewHeader
                contentComponent={contentComponent}
                iconComponent={<DesktopIcon />} />
            <GroupableList
                items={dashboards}
                listItemClick={onListItemClick}
                onRenameClick={onRenameClick}
                onCopyClick={onCopyClick}
                onDeleteClick={promptForDelete}
                onBookmarkClick={onBookmarkClick} />
        </PlanePreviewItem>
    );
};

MyDashboardsView.propTypes = {
    // Data fields
    dashboards: PropTypes.array.isRequired,

    // Dispatches
    onListItemClick: PropTypes.func.isRequired,
    onRenameClick: PropTypes.func.isRequired,
    deleteDashboardAndFetchMyDashboards: PropTypes.func.isRequired,
    onCopyClick: PropTypes.func.isRequired,
    openDashboardTemplatesPlane: PropTypes.func.isRequired,
    onBookmarkClick: PropTypes.func.isRequired,

    // i18n messages
    deleteDashboardHeading: PropTypes.string.isRequired,
    deleteDashboardConfirmation: PropTypes.string.isRequired,
    buttonDelete: PropTypes.string.isRequired,
    buttonCancel: PropTypes.string.isRequired
};

export {
    MyDashboardsView
};
