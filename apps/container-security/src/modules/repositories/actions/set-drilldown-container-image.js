import { SET_DRILLDOWN_CONTAINER_IMAGE } from './types';

const setDrilldownContainerImage = (containerImage = {}) => {
    return {
        type: SET_DRILLDOWN_CONTAINER_IMAGE,
        payload: containerImage
    };
};

export {
    setDrilldownContainerImage
};
