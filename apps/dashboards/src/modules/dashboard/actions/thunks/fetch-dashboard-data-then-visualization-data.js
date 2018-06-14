import { fetchDashboardData, fetchVisualizationData } from '../';
import { BRANCH_NAME, STEM_NAME } from '../../constants';

const fetchDashboardDataThenVisualizationData = (dashboardUuid = null) => {
    return (dispatch, getState) => {
        (async () => {
            await dispatch(fetchDashboardData(dashboardUuid));

            const dashboardState = getState()[BRANCH_NAME][STEM_NAME];
            const dashboardData = dashboardState.dashboardData;
            const componentUuids = dashboardData.components.map((component) => {
                return {
                    dashboardUuid: dashboardData.uuid,
                    componentUuid: component.uuid
                };
            });

            dispatch(fetchVisualizationData(componentUuids));
        })();
    };
};

export {
    fetchDashboardDataThenVisualizationData
};
