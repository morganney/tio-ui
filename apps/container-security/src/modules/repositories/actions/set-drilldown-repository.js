import { SET_DRILLDOWN_REPOSITORY } from './types';

const setDrilldownRepository = (repository = {}) => {
    return {
        type: SET_DRILLDOWN_REPOSITORY,
        payload: repository
    };
};

export {
    setDrilldownRepository
};
