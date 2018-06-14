import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { injectIntl } from 'react-intl';

import { resetDashboardTemplatePreview } from '../../actions';
import { DashboardTemplatePreviewView } from '../presentations';
import { BRANCH_NAME, STEM_NAME } from '../../constants';

class DashboardTemplatePreview extends Component {
    static propTypes = {
        // Data fields
        dashboardTemplatePreview: PropTypes.object.isRequired,

        // Dispatches
        resetDashboardTemplatePreview: PropTypes.func.isRequired
    };

    componentDidMount () {
        this.props.resetDashboardTemplatePreview();
    }

    render () {
        return (
            <DashboardTemplatePreviewView {...this.props} />
        );
    }
}

const mapStateToProps = (state) => {
    const {
        dashboardTemplatePreview
    } = state[BRANCH_NAME][STEM_NAME];

    return {
        dashboardTemplatePreview
    };
};

const mapDispatchToProps = {
    resetDashboardTemplatePreview
};

const DashboardTemplatePreviewContainer = withRouter(
    injectIntl(connect(mapStateToProps, mapDispatchToProps)(DashboardTemplatePreview))
);

export {
    DashboardTemplatePreviewContainer
};
