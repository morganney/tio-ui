import { CLEAR_TEMPORARY_FEATUREFLAG } from './types';

const clearTempFeatureFlag = (flag) => {
    return {
        type: CLEAR_TEMPORARY_FEATUREFLAG,
        payload: flag
    };
};

export {
    clearTempFeatureFlag
};
