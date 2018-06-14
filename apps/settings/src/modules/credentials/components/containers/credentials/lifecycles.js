import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Notification, ShowNotification } from '@hivekit/notification';

import { CredentialsView } from '../../presentations';

class CredentialsLifeCycles extends Component {
    static propTypes = {
        // Data
        notificationState: PropTypes.object.isRequired,

        // Dispatches
        setNotificationState: PropTypes.func.isRequired,
        fetchCredentialsFilters: PropTypes.func.isRequired
    };

    componentDidMount () {
        this.props.fetchCredentialsFilters();
    }

    componentDidUpdate () {
        const { notificationState } = this.props;

        if (notificationState.payload) {
            const { status, message } = notificationState.payload;

            if (status && message) {
                ShowNotification(
                    <Notification
                        status={status}
                        message={message} />
                );

                // Reset the state back to empty
                this.props.setNotificationState({});
            }
        }
    }

    render () {
        return (
            <CredentialsView {...this.props} />
        );
    }
}

export {
    CredentialsLifeCycles
};
