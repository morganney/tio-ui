import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Notification, ShowNotification } from '@hivekit/notification';

import { PolicyTableView } from '../../presentations';

class PolicyTableLifecycles extends Component {
    static propTypes = {
        // Redux Data fields
        notificationType: PropTypes.string,
        notificationMessage: PropTypes.string,

        // Redux Dispatches
        fetchPolicies: PropTypes.func.isRequired,
        togglePolicyTablePlane: PropTypes.func.isRequired,
        setNotificationState: PropTypes.func.isRequired
    }

    componentDidMount () {
        // On component mount via react-router, fetch the policies, and open the plane.
        const { fetchPolicies, togglePolicyTablePlane } = this.props;

        // TODO: fetchPolicies is called twice, I think this is calling it once, and the table is calling it once on its own
        fetchPolicies();
        togglePolicyTablePlane('full');
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
        return (
            <PolicyTableView {...this.props} />
        );
    }
}

export {
    PolicyTableLifecycles
};
