import {
    IMAGE_INVENTORY_REQUEST,
    IMAGE_INVENTORY_SUCCESS,
    IMAGE_INVENTORY_ERROR
} from '../actions/types';

const initialState = false;

const isImageInventoryFetching = (state = initialState, action) => {
    switch (action.type) {
        case IMAGE_INVENTORY_REQUEST:
            return true;
        case IMAGE_INVENTORY_SUCCESS:
        case IMAGE_INVENTORY_ERROR:
            return false;
        default:
            return state;
    }
};

export {
    isImageInventoryFetching
};
