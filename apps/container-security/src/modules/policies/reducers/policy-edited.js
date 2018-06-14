import {
    EDIT_POLICY_SUCCESS,
    EDIT_POLICY_ERROR
} from '../actions/types';

const initialState = {
    success: false,
    data: {}
};
const policyEdited = (state = initialState, action) => {
    switch (action.type) {
        case EDIT_POLICY_SUCCESS:
            return {
                success: true,
                data: action.payload
            };
        case EDIT_POLICY_ERROR:
            return {
                success: false,
                data: action.payload
            };
        default:
            return state;
    }
};

export {
    policyEdited
};
