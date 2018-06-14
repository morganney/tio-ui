import {
    CREATE_POLICY_SUCCESS,
    CREATE_POLICY_ERROR
} from '../actions/types';

const initialState = {
    success: false,
    data: {}
};
const policyCreated = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_POLICY_SUCCESS:
            return {
                success: true,
                data: action.payload
            };
        case CREATE_POLICY_ERROR:
            return {
                success: false,
                data: action.payload
            };
        default:
            return state;
    }
};

export {
    policyCreated
};
