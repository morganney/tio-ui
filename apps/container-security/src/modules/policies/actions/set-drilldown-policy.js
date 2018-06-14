import { SET_DRILLDOWN_POLICY } from './types';

const setDrilldownPolicy = (policy = {}) => {
    return {
        type: SET_DRILLDOWN_POLICY,
        payload: policy
    };
};

export {
    setDrilldownPolicy
};
