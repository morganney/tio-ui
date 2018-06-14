import { STANDARD_API_ACTION } from 'tio-alloy';

import {
    IMAGE_REPORT_REQUEST,
    IMAGE_REPORT_SUCCESS,
    IMAGE_REPORT_ERROR
} from './types';

import { REPORTS_BASE_API } from '../constants';

const fetchImageReport = (imageDigest = null) => {
    const url = `${REPORTS_BASE_API}/${imageDigest}`;

    return {
        type: STANDARD_API_ACTION,
        meta: {
            types: [
                IMAGE_REPORT_REQUEST,
                IMAGE_REPORT_SUCCESS,
                IMAGE_REPORT_ERROR
            ],
            request: url,
            shouldFetch: () => {
                return true;
            }
        }
    };
};

export {
    fetchImageReport
};
