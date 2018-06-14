import {
    DELETE_POLICY_SUCCESS,
    DELETE_POLICY_ERROR
} from '../actions/types';

const initialState = {
    success: false,
    data: {}
};
const policyDeleted = (state = initialState, action) => {
    switch (action.type) {
        case DELETE_POLICY_SUCCESS:
            return {
                success: true,
                data: action.payload
            };
        case DELETE_POLICY_ERROR:
            return {
                success: false,
                data: action.payload
            };
        default:
            return state;
    }
};

export {
    policyDeleted
};
