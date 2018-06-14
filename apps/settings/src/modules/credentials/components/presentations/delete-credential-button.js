import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Cell } from '@hivekit/table';
import { Button } from '@hivekit/button';
import { CloseIcon } from '@hivekit/icon';
import { Notification, NotificationActionBar, ShowNotification } from '@hivekit/notification';

class DeleteCredentialButtonView extends Component {
    static propTypes = {
        // Data fields
        node: PropTypes.object.isRequired,

        // Dispatchers
        deleteCredentialAndDoPostRender: PropTypes.func.isRequired
    };

    constructor () {
        super();

        this.removeAction = this.removeAction.bind(this);
    }

    removeAction () {
        const { uuid } = this.props.node.data;
        const { deleteCredentialAndDoPostRender } = this.props;

        function handleDeleteClick () {
            deleteCredentialAndDoPostRender(uuid);
        }

        ShowNotification(
            <Notification
                message='Are you sure you want to delete this Credential?'
                title='Confirm Deletion'
                actions={
                    <NotificationActionBar>
                        <Button>
                        Cancel
                        </Button>
                        <Button kind='primary' onClick={handleDeleteClick}>
                            Delete
                        </Button>
                    </NotificationActionBar>
                }
            />, { autoClose: false }
        );
    }

    render () {
        return (
            <Cell {...this.props}>
                <Button
                    onClick={this.removeAction}
                    kind='action'>
                    <CloseIcon
                        size={0}
                    />
                </Button>
            </Cell>
        );
    }
}

export {
    DeleteCredentialButtonView
};
