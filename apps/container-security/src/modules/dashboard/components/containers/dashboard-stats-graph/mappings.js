import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { BRANCH_NAME, STEM_NAME } from 'tio-container-security/modules/dashboard/constants';
import { actions as repositoriesActions } from 'tio-container-security/modules/repositories';

import { DashboardStatsGraphLifecycles } from './lifecycles';

const { toggleRepositoryTablePlane } = repositoriesActions;

const mapStateToProps = (state) => {
    const { organizationStats } = state[BRANCH_NAME][STEM_NAME];

    let imagesCount = 0;
    let policiesCount = 0;
    let repositoriesCount = 0;
    let pushesCount = 0;
    let pullsCount = 0;

    if (organizationStats.payload) {
        imagesCount = organizationStats.payload.imagesCount;
        policiesCount = organizationStats.payload.policiesCount;
        repositoriesCount = organizationStats.payload.repositoryCount;
        pushesCount = organizationStats.payload.pushCount;
        pullsCount = organizationStats.payload.pullCount;
    }

    return {
        // State
        imagesCount,
        policiesCount,
        repositoriesCount,
        pushesCount,
        pullsCount
    };
};

const mapDispatchToProps = {
    toggleRepositoryTablePlane
};

const DashboardStatsGraphContainer = compose(
    injectIntl,
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(DashboardStatsGraphLifecycles);

export {
    DashboardStatsGraphContainer
};
