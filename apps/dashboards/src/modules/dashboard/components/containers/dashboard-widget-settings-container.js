import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

import coreMessages from 'tio-app/messages';

import { BRANCH_NAME, STEM_NAME } from '../../constants';
import { copyDashboardWidgetAndFetchDashboardData, editDashboardWidgetTitleAndDoPostRender } from '../../actions';
import { DashboardWidgetSettingsView } from '../presentations';
import { messages } from '../../';

class DashboardWidgetSettings extends Component {
    static propTypes = {
        // Data Fields
        dashboardData: PropTypes.object.isRequired,
        widgetData: PropTypes.object.isRequired,

        // i18n messages
        duplicateText: PropTypes.string.isRequired,
        deleteText: PropTypes.string.isRequired,

        // Dispatches
        editWidgetTitle: PropTypes.func.isRequired,
        copyDashboardWidget: PropTypes.func.isRequired,
        deleteDashboardWidget: PropTypes.func.isRequired
    };

    constructor () {
        super();

        this.updateDashboardWidgetTitle = this.updateDashboardWidgetTitle.bind(this);
    }

    updateDashboardWidgetTitle (title) {
        const { dashboardData, widgetData, editWidgetTitle } = this.props;

        // Only perform action if the title has actually been updated
        if (title !== widgetData.name) {
            editWidgetTitle(dashboardData.uuid, widgetData.uuid, title);
        }
    }

    render () {
        return (
            <DashboardWidgetSettingsView
                {...this.props}
                updateWidgetTitle={this.updateDashboardWidgetTitle}
                duplicateDashboardWidget={this.props.copyDashboardWidget} />
        );
    }
}

const mapStateToProps = (state, props) => {
    const {
        dashboardData,
        visualizationData,
        dashboardWidgetActive
    } = state[BRANCH_NAME][STEM_NAME];
    const { intl } = props;
    const { buttonDelete } = coreMessages.buttons;
    const { actionDuplicate } = messages.dashboardSettings;
    const widgetData = visualizationData.data.filter((widget) => {
        return widget.uuid === dashboardWidgetActive;
    });

    return {
        // props
        dashboardData,
        widgetData: widgetData[0],
        dashboardWidgetActive,

        // i18n messages
        duplicateText: intl.formatMessage(actionDuplicate),
        deleteText: intl.formatMessage(buttonDelete)
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        editWidgetTitle: (dashboardUuid, widgetUuid, title) => {
            dispatch(editDashboardWidgetTitleAndDoPostRender(dashboardUuid, widgetUuid, title));
        },
        deleteDashboardWidget: (widgetUuid) => {
            alert(`Delete widget ${widgetUuid}`);
        },
        copyDashboardWidget: (dashboardUuid, widgetUuid) => {
            dispatch(copyDashboardWidgetAndFetchDashboardData(dashboardUuid, widgetUuid));
        }
    };
};

const DashboardWidgetSettingsContainer = injectIntl(
    connect(mapStateToProps, mapDispatchToProps)(DashboardWidgetSettings)
);

export {
    DashboardWidgetSettingsContainer
};
