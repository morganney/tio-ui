import { connect } from 'react-redux';

import { BRANCH_NAME, STEM_NAME } from 'tio-container-security/modules/dashboard/constants';

import { DashboardImagesByOsChartLifecycles } from './lifecycles';

const mapStateToProps = (state) => {
    // Redux state
    const {
        organizationStats
    } = state[BRANCH_NAME][STEM_NAME];
    let osData = [];

    if (organizationStats.payload) {
        osData = organizationStats.payload.osData;
    }

    return {
        // State
        osData
    };
};
const mapDispatchToProps = null;

const DashboardImagesByOsChartContainer =
    connect(mapStateToProps, mapDispatchToProps)(DashboardImagesByOsChartLifecycles);

export {
    DashboardImagesByOsChartContainer
};
