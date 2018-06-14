import { TOGGLE_IMAGE_TABLE_PLANE } from './types';

const toggleImageTablePlane = (displayType = 'closed') => {
    return {
        type: TOGGLE_IMAGE_TABLE_PLANE,
        payload: displayType
    };
};

export {
    toggleImageTablePlane
};
