import React from 'react';
import PropTypes from 'prop-types';

import { UserPermissionsRowComponent } from './../';

const UserPermissionsTableView = (props) => {
    const {
        userName
    } = props;

    // TODO replace with permissions from redux store
    const userPermissions = [
        {
            name: userName,
            isCreator: true
        },
        {
            name: 'Jin Choi',
            permission: 0
        }
    ];

    const userPermissionRows = userPermissions.map((userPermission) => {
        return <UserPermissionsRowComponent {...userPermission} key={userPermission.name}/>;
    });

    return (
        <div>
            {userPermissionRows}
        </div>
    );
};

export {
    UserPermissionsTableView
};

UserPermissionsTableView.propTypes = {
    userName: PropTypes.string
};
