import { STANDARD_API_ACTION } from 'tio-alloy';

import { fetchImages, types } from '../actions';
import { IMAGES_BASE_API } from '../constants';

const { IMAGES_REQUEST, IMAGES_SUCCESS, IMAGES_ERROR } = types;

describe('Images Module Actions', () => {
    it('Should create an action to query policy data from the API', () => {
        const defaultUrl = `${IMAGES_BASE_API}?offset=0&limit=50`;
        const expectedAction = {
            type: STANDARD_API_ACTION,
            meta: {
                types: [
                    IMAGES_REQUEST,
                    IMAGES_SUCCESS,
                    IMAGES_ERROR
                ],
                request: defaultUrl,
                shouldFetch: () => {
                    return true;
                }
            }
        };
        const receivedAction = fetchImages();

        expect(receivedAction.type).toEqual(expectedAction.type);
        expect(receivedAction.meta.types).toEqual(expectedAction.meta.types);
        expect(receivedAction.meta.request).toEqual(expectedAction.meta.request);
        expect(receivedAction.meta.shouldFetch()).toEqual(expectedAction.meta.shouldFetch());
    });
});
