import React, { Component } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import { Notification, ShowNotification } from '@hivekit/notification';

import {
    BRANCH_NAME as CORE_BRANCH_NAME,
    STEM_NAME as CORE_STEM_NAME
} from 'tio-app/modules/session/constants';

import { BRANCH_NAME, STEM_NAME, NOTIFICATION_TYPE_MAP } from '../../constants';
import {
    editDashboardTitleAndDoPostRender,
    setNotificationState,
    fetchDefaultDashboard
} from '../../actions';
import { DashboardHeaderView } from '../presentations';
import { messages } from '../../';

class DashboardHeader extends Component {
    static propTypes = {
        // Data Fields
        dashboardData: PropTypes.object.isRequired,
        notificationState: PropTypes.object,

        // i18n messages
        configureText: PropTypes.string.isRequired,
        exportText: PropTypes.string.isRequired,
        myDashboardsText: PropTypes.string.isRequired,

        // Dispatches
        editDashboardTitle: PropTypes.func.isRequired,
        setNotificationState: PropTypes.func.isRequired,
        exportDashboard: PropTypes.func.isRequired,
        getDefaultDashboard: PropTypes.func.isRequired
    };

    componentDidUpdate () {
        const { notificationState, getDefaultDashboard } = this.props;

        if (notificationState.payload) {
            const { type, message } = notificationState.payload;

            if (type && message) {
                // Render the notification
                setTimeout(() => {
                    ShowNotification(
                        <Notification
                            status={NOTIFICATION_TYPE_MAP[type]}
                            message={message}
                        />
                    );
                });

                // Then, reset the state of the notification to 'empty'
                this.props.setNotificationState({});
            }
        }

        getDefaultDashboard();
    }

    updateDashboardTitle = (title) => {
        const { dashboardData, editDashboardTitle } = this.props;

        // Only perform action if the title has actually been updated
        if (title !== dashboardData.name) {
            editDashboardTitle(dashboardData.uuid, title);
        }
    };

    render () {
        return (
            <DashboardHeaderView
                {...this.props}
                updateDashboardTitle={this.updateDashboardTitle} />
        );
    }
}

const mapStateToProps = (state, props) => {
    const {
        dashboardData,
        notificationState
    } = state[BRANCH_NAME][STEM_NAME];
    const { intl } = props;
    const {
        configureDashboardIcon,
        exportDashboardIcon,
        myDashboardsIcon
    } = messages.dashboardHeader;
    // TODO: derive this boolean using a selector once there is an established pattern - CI-21908
    const showDashboardsIcon = state[CORE_BRANCH_NAME][CORE_STEM_NAME].activeFeatures.dashboards_gen2 || false;

    return {
        // props
        dashboardData,
        notificationState,
        showDashboardsIcon,

        // i18n messages
        configureText: intl.formatMessage(configureDashboardIcon),
        exportText: intl.formatMessage(exportDashboardIcon),
        myDashboardsText: intl.formatMessage(myDashboardsIcon)
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        editDashboardTitle: (uuid, title) => {
            dispatch(editDashboardTitleAndDoPostRender(uuid, title));
        },
        setNotificationState: (msg) => {
            dispatch(setNotificationState(msg));
        },
        exportDashboard: () => {
            alert('Export dashboard...');
        },
        getDefaultDashboard: () => {
            dispatch(fetchDefaultDashboard());
        }
    };
};

const DashboardHeaderContainer = injectIntl(
    connect(mapStateToProps, mapDispatchToProps)(DashboardHeader)
);

export {
    DashboardHeaderContainer
};
