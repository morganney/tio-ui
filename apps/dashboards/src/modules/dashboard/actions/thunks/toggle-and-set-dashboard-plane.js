import {
    toggleDashboardPlane,
    setDashboardPlaneContent
} from '../';
import { BRANCH_NAME, STEM_NAME, PLANE_VIEW } from '../../constants';

const toggleAndSetDashboardPlane = (planeView, planes) => {
    return (dispatch, getState) => {
        dispatch(toggleDashboardPlane(planeView));

        const dashboardState = getState()[BRANCH_NAME][STEM_NAME];
        const dashboardPlaneDisplay = dashboardState.dashboardPlaneDisplay;

        if (dashboardPlaneDisplay !== PLANE_VIEW.CLOSED) {
            dispatch(setDashboardPlaneContent(planes));
        }
    };
};

export {
    toggleAndSetDashboardPlane
};
