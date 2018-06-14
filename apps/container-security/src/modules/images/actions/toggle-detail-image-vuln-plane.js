import { TOGGLE_DETAIL_IMAGE_VULN_PLANE } from './types';

const toggleDetailImageVulnPlane = (displayType = 'closed') => {
    return {
        type: TOGGLE_DETAIL_IMAGE_VULN_PLANE,
        payload: displayType
    };
};

export {
    toggleDetailImageVulnPlane
};
