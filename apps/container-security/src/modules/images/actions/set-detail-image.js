import { SET_DETAIL_IMAGE } from './types';

const setDetailImage = (image = {}) => {
    return {
        type: SET_DETAIL_IMAGE,
        payload: image
    };
};

export {
    setDetailImage
};
