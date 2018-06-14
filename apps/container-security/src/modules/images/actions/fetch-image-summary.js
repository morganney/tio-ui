import { STANDARD_API_ACTION } from 'tio-alloy';

import {
    IMAGE_SUMMARY_REQUEST,
    IMAGE_SUMMARY_SUCCESS,
    IMAGE_SUMMARY_ERROR
} from './types';

import { BASE_API } from '../constants';

const imagesAPICardName = 'images';

const fetchImageSummary = (cardName = imagesAPICardName) => {
    const url = `${BASE_API}/summary-cards/${cardName}`;

    return {
        type: STANDARD_API_ACTION,
        meta: {
            types: [
                IMAGE_SUMMARY_REQUEST,
                IMAGE_SUMMARY_SUCCESS,
                IMAGE_SUMMARY_ERROR
            ],
            request: url
        }
    };
};

export {
    fetchImageSummary
};
