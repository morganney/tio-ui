import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Notification, ShowNotification } from '@hivekit/notification';

class RepositoryTableLifecycles extends Component {
    static propTypes = {
        // container
        tioRender: PropTypes.func.isRequired,
        // dipatch
        fetchRepositories: PropTypes.func.isRequired,
        repositorySearch: PropTypes.string,

        // Redux Data fields
        notificationType: PropTypes.string,
        notificationMessage: PropTypes.string,

        // Redux Dispatches
        setNotificationState: PropTypes.func.isRequired
    };

    componentDidUpdate (prevProps) {
        const { repositorySearch, fetchRepositories } = this.props;
        const {
            notificationType: type,
            notificationMessage: message,
            setNotificationState
        } = this.props;

        if (prevProps.repositorySearch !== repositorySearch) {
            fetchRepositories({ repositorySearch });
        }

        if (type && message) {
            const typeMap = {
                success: 'low',
                error: 'critical'
            };

            // Render the notification
            ShowNotification(
                <Notification
                    status={typeMap[type]}
                    message={message} />
            );

            // Then, reset the state of the notification to 'empty'
            setNotificationState({});
        }
    }

    render () {
        return this.props.tioRender(this.props);
    }
}

export {
    RepositoryTableLifecycles
};
