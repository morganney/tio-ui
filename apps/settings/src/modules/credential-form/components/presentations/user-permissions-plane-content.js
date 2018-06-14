import React from 'react';
import PropTypes from 'prop-types';
import { colors } from '@hivekit/core';
import { PlanePreviewItem } from '@hivekit/plane';
import { CredentialIcon } from '@hivekit/icon';
import { H6 } from '@hivekit/header';
import { Select } from '@hivekit/select';

import { Patterns } from 'tio-common';

import { UserPermissionsTableView } from './';

const {
    PlanePreviewHeader,
    HeaderIcon,
    TitleView,
    DescriptionView
} = Patterns.plane;

const UserPermissionsPlaneContentView = (props) => {
    const {
        userName
    } = props;

    const onUserSearchInputChange = () => {
        // TODO: Implement user search input value reducers/actions/dispatches/etc.
    };

    const onUserSearch = () => {
        // TODO: Implement user search
    };

    const headerTitle = 'Add User Permission';
    const headerDescription =
        'Select users and/or groups that should also be ' +
        'able to use this credential and specify their level of access';

    return (
        <div>
            <PlanePreviewHeader
                hasBorderBottom={true}
                iconComponent={<HeaderIcon name={CredentialIcon} />}
                titleComponent={<TitleView value={headerTitle} />}
                descriptionComponent={<DescriptionView value={headerDescription} expandable={false} />} />
            <PlanePreviewItem>
                <H6 color={colors.gray} mt={1}>ADD USERS OR GROUPS</H6>
                <Select
                    placeholder='Search by user or group name'
                    value=''
                    onChange={onUserSearchInputChange}
                    searchable={true}
                    searchableIcon={true}
                    // enableAsyncSearch={true}
                    loadOptions={onUserSearch}
                    mt={2}
                    mb={3}>
                </Select>
                <UserPermissionsTableView userName={userName} />
            </PlanePreviewItem>
        </div>
    );
};

export {
    UserPermissionsPlaneContentView
};

UserPermissionsPlaneContentView.propTypes = {
    userName: PropTypes.string
};
