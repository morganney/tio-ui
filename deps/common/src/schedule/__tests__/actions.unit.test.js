import { STANDARD_API_ACTION } from 'tio-alloy';

import {
    getTimezones,
    GET_TIMEZONES_REQUEST,
    GET_TIMEZONES_SUCCESS,
    GET_TIMEZONES_ERROR
} from '../actions';

describe('Common schedule actions', () => {
    it('Should create an action to fetch timezones', () => {
        const expected = {
            type: STANDARD_API_ACTION,
            meta: {
                request: '/scans/timezones',
                types: [
                    GET_TIMEZONES_REQUEST,
                    GET_TIMEZONES_SUCCESS,
                    GET_TIMEZONES_ERROR
                ]
            }
        };
        const actual = getTimezones();

        expect(actual).toHaveProperty('meta.shouldFetch');
        delete actual.meta.shouldFetch;
        expect(actual).toEqual(expected);
    });
});
