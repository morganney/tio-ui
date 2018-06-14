import { TOGGLE_REPOSITORY_DRILLDOWN_PLANE } from './types';

const toggleRepositoryDrilldownPlane = (displayType = 'closed') => {
    return {
        type: TOGGLE_REPOSITORY_DRILLDOWN_PLANE,
        payload: displayType
    };
};

export {
    toggleRepositoryDrilldownPlane
};
