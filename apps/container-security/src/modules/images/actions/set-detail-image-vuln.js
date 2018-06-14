import { SET_DETAIL_IMAGE_VULN } from './types';

const setDetailImageVuln = (image = {}) => {
    return {
        type: SET_DETAIL_IMAGE_VULN,
        payload: image
    };
};

export {
    setDetailImageVuln
};
