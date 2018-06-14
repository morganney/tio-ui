import React from 'react';
import PropTypes from 'prop-types';
import { Plane } from '@hivekit/plane';
import { FormFooter } from '@hivekit/form';
import { Button } from '@hivekit/button';

import { UserPermissionsPlaneContentComponent } from './../';

const UserPermissionsPlaneView = (props) => {
    const {
        userPermissionsPlaneState,
        setUserPermissionsPlaneState,
        userName
    } = props;

    const renderPlaneContent = () => {
        return <UserPermissionsPlaneContentComponent userName={userName} />;
    };

    const renderFooter = () => {
        const handleFormCancel = () => {
            // TODO add implementation
        };

        const handleFormSubmission = () => {
            // TODO add implementation
        };

        // TODO add condition for action button disabling
        const disabled = false;

        return (
            <FormFooter>
                <Button
                    mr={2}
                    kind='tertiary'
                    onClick={handleFormCancel}>
                    Cancel
                </Button>

                <Button
                    kind='primary'
                    onClick={handleFormSubmission}
                    disabled={disabled}>
                    Add
                </Button>
            </FormFooter>
        );
    };

    return (
        <Plane
            onChange={setUserPermissionsPlaneState}
            display={userPermissionsPlaneState}
            preview={renderPlaneContent}
            previewFooter={renderFooter}
        />
    );
};

export {
    UserPermissionsPlaneView
};

UserPermissionsPlaneView.propTypes = {
    // Data Fields
    userPermissionsPlaneState: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired,

    // Dispatches
    setUserPermissionsPlaneState: PropTypes.func.isRequired
};
