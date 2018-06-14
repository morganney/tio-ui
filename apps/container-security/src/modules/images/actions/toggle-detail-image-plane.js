import { TOGGLE_DETAIL_IMAGE_PLANE } from './types';

const toggleDetailImagePlane = (displayType = 'closed') => {
    return {
        type: TOGGLE_DETAIL_IMAGE_PLANE,
        payload: displayType
    };
};

export {
    toggleDetailImagePlane
};
