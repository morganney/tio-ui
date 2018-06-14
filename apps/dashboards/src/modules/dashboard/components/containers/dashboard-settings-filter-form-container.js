import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { reduxForm, formValueSelector, SubmissionError } from 'redux-form';
import { FormItem } from '@hivekit/form';

import { BRANCH_NAME, STEM_NAME, REDUX_FORM_FILTER_DASHBOARD } from '../../constants';
import { DashboardSettingsFilterFormView } from '../presentations';
import { TargetGroupMultiSelectComponent, CustomTargetTextareaComponent } from '../';
import {
    openDashboardSettingsFilterPlane,
    filterDashboardAndDoPostRender,
    filterDashboardWidgetAndDoPostRender
} from '../../actions';
import { getInitialFilterFormValues } from '../../utils';

class DashboardSettingsFilterForm extends Component {
    static propTypes = {
        // redux data fields
        targetGroups: PropTypes.array.isRequired,
        dashboardData: PropTypes.object.isRequired,
        dashboardPlaneContent: PropTypes.string.isRequired,
        dashboardWidgetActive: PropTypes.string,

        // redux form data
        filterValue: PropTypes.object,

        // dispatches
        openDashboardSettingsFilterPlane: PropTypes.func.isRequired
    };

    constructor () {
        super();

        this.renderChildInput = this.renderChildInput.bind(this);
    }

    componentDidMount () {
        this.props.openDashboardSettingsFilterPlane(true);
    }

    renderChildInput () {
        const { filterValue, targetGroups } = this.props;

        if (filterValue && filterValue.value) {
            switch (filterValue.value) {
                case 'targetList':
                    return (
                        <FormItem>
                            <TargetGroupMultiSelectComponent
                                targetGroups={targetGroups} />
                        </FormItem>
                    );
                case 'hostAddress':
                    return (
                        <FormItem>
                            <CustomTargetTextareaComponent />
                        </FormItem>
                    );
            }
        }
    }

    render () {
        return (
            <DashboardSettingsFilterFormView
                renderChildInput={this.renderChildInput} />
        );
    }
}

const mapStateToProps = (state) => {
    const {
        targetGroups,
        dashboardData,
        dashboardPlaneContent,
        dashboardWidgetActive
    } = state[BRANCH_NAME][STEM_NAME];
    const selector = formValueSelector(REDUX_FORM_FILTER_DASHBOARD);
    const filterValue = selector(state, 'selectAssets');

    return {
        filterValue,
        targetGroups,
        dashboardData,
        initialValues: getInitialFilterFormValues(dashboardData, dashboardWidgetActive),
        dashboardPlaneContent,
        dashboardWidgetActive
    };
};

const mapDispatchToProps = {
    openDashboardSettingsFilterPlane
};

const DashboardSettingsFilterFormContainer = compose(
    connect(mapStateToProps, mapDispatchToProps),
    reduxForm({
        form: REDUX_FORM_FILTER_DASHBOARD,
        onSubmit: (values, dispatch, props) => {
            const {
                dashboardData,
                dashboardPlaneContent,
                dashboardWidgetActive
            } = props;
            let payload = {};
            let targetGroupId = null;
            let focusFilter = 'all';

            if (values.selectAssets.value === 'targetList') {
                if (!values.targetGroups.length) {
                    throw new SubmissionError({ targetGroups: 'Target Groups Required' });
                }
            } else if (values.selectAssets.value === 'hostAddress') {
                if (!values.customTarget || values.customTarget === '') {
                    throw new SubmissionError({ customTarget: 'Custom Target(s) Required' });
                }
            }

            if (values.targetGroups) {
                targetGroupId = values.targetGroups.map((targetGroup) => {
                    if (targetGroup.id) {
                        return targetGroup.id.toString();
                    }

                    return targetGroup;
                });
            }

            switch (values.selectAssets.value) {
                case 'targetList':
                    focusFilter = { targetList: targetGroupId };
                    break;
                case 'hostAddress':
                    focusFilter = { hostAddress: values.customTarget };
                    break;
            }

            const dashboardComponents = dashboardData.components.map((component) => {
                return {
                    uuid: component.uuid,
                    focusFilter
                };
            });

            payload.components = dashboardComponents;

            if (dashboardPlaneContent === 'widget-settings') {
                for (let i = dashboardComponents.length; i--;) {
                    const component = dashboardComponents[i];

                    if (component.uuid === dashboardWidgetActive) {
                        payload = component;
                    }
                }

                dispatch(filterDashboardWidgetAndDoPostRender(dashboardData.uuid, dashboardWidgetActive, payload));

                return;
            }

            dispatch(filterDashboardAndDoPostRender(dashboardData.uuid, payload));
        },
        enableReinitialize: true
    })
)(DashboardSettingsFilterForm);

export {
    DashboardSettingsFilterFormContainer
};
