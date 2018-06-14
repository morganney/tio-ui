import { SET_TEMPORARY_FEATUREFLAG } from './types';

const setTempFeatureFlag = (flag) => {
    return {
        type: SET_TEMPORARY_FEATUREFLAG,
        payload: flag
    };
};

export {
    setTempFeatureFlag
};
