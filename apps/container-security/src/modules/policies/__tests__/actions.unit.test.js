import { STANDARD_API_ACTION } from 'tio-alloy';

import { fetchPolicies, types } from '../actions';

// Unpack policy fetch action types
const { POLICIES_REQUEST, POLICIES_SUCCESS, POLICIES_ERROR } = types;

describe('Policies Module Actions', () => {
    it('Should create an action to query policy data from the API', () => {
        const defaultUrl = '/container-security/api/v2/policies?offset=0&limit=50';
        const expectedAction = {
            type: STANDARD_API_ACTION,
            meta: {
                types: [
                    POLICIES_REQUEST,
                    POLICIES_SUCCESS,
                    POLICIES_ERROR
                ],
                request: defaultUrl
            }
        };
        const receivedAction = fetchPolicies();

        expect(receivedAction).toEqual(expectedAction);
    });
});
