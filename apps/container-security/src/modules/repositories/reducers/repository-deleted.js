import {
    DELETE_REPOSITORY_SUCCESS,
    DELETE_REPOSITORY_ERROR
} from '../actions/types';

const initialState = {
    success: false,
    data: {}
};
const repositoryDeleted = (state = initialState, action) => {
    switch (action.type) {
        case DELETE_REPOSITORY_SUCCESS:
            return {
                success: true,
                data: action.payload
            };
        case DELETE_REPOSITORY_ERROR:
            return {
                success: false,
                data: action.payload
            };
        default:
            return state;
    }
};

export {
    repositoryDeleted
};
