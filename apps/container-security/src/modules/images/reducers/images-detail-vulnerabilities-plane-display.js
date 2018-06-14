import { TOGGLE_DETAIL_IMAGE_VULN_PLANE } from '../actions/types';

const imagesDetailVulnPlaneDisplay = (state = 'closed', action) => {
    switch (action.type) {
        case TOGGLE_DETAIL_IMAGE_VULN_PLANE:
            return action.payload;
        default:
            return state;
    }
};

export {
    imagesDetailVulnPlaneDisplay
};
