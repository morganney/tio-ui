/* eslint-disable no-undefined */
import { timezones } from '../reducers';
import { GET_TIMEZONES_SUCCESS, GET_TIMEZONES_ERROR } from '../actions';

describe('Common schedule reducers', () => {
    describe('"timezones"', () => {
        it('Should return empty array as default state', () => {
            expect(timezones(undefined, {})).toEqual([]);
        });

        it('Should return unchanged state for unrecognized actions', () => {
            expect(timezones(['foo'], {})).toEqual(['foo']);
        });

        it('Should handle GET_TIMEZONES_SUCCESS by returning action.payload.timezones', () => {
            const slice = ['UTC'];
            const mock = ['foo', 'bar'];
            const action = {
                type: GET_TIMEZONES_SUCCESS,
                payload: {
                    timezones: mock
                }
            };

            expect(timezones(slice, action)).toEqual(mock);
        });

        it('Should handle GET_TIMEZONES_ERROR by returning the slice passed', () => {
            const slice = ['UTC'];
            const action = {
                type: GET_TIMEZONES_ERROR,
                error: true
            };

            expect(timezones(slice, action)).toEqual(slice);
        });
    });
});
