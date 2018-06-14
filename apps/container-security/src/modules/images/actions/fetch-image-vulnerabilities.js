import { STANDARD_API_ACTION } from 'tio-alloy';

import {
    IMAGE_VULNERABILITIES_REQUEST,
    IMAGE_VULNERABILITIES_SUCCESS,
    IMAGE_VULNERABILITIES_ERROR
} from './types';

import { REPORTS_BASE_API } from '../constants';

const fetchImageVulnerabilities = (imageDigest = null) => {
    const url = `${REPORTS_BASE_API}/${imageDigest}`;

    return {
        type: STANDARD_API_ACTION,
        meta: {
            types: [
                IMAGE_VULNERABILITIES_REQUEST,
                IMAGE_VULNERABILITIES_SUCCESS,
                IMAGE_VULNERABILITIES_ERROR
            ],
            request: url,
            shouldFetch: () => {
                return true;
            }
        }
    };
};

export {
    fetchImageVulnerabilities
};
