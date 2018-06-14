import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Notification, ShowNotification } from '@hivekit/notification';

class CreateConnectorLifecycles extends Component {
    static propTypes = {
        // Redux data/reducers
        createConnectorPlaneDisplay: PropTypes.string.isRequired,
        notificationType: PropTypes.string,
        notificationMessage: PropTypes.string,

        // Redux dispatches
        toggleCreateConnectorPlane: PropTypes.func.isRequired,
        setNotificationState: PropTypes.func.isRequired,

        // container
        tioRender: PropTypes.func.isRequired
    };

    componentDidMount () {
        const { toggleCreateConnectorPlane } = this.props;

        toggleCreateConnectorPlane('partial');
    }

    componentDidUpdate () {
        const {
            notificationType: type,
            notificationMessage: message,
            setNotificationState
        } = this.props;

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
    CreateConnectorLifecycles
};
