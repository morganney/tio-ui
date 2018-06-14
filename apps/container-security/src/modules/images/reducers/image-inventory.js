import {
    IMAGE_INVENTORY_SUCCESS,
    IMAGE_INVENTORY_ERROR
} from '../actions/types';

const initialState = { packages: [] };

const imageInventory = (state = initialState, action) => {
    switch (action.type) {
        case IMAGE_INVENTORY_SUCCESS: {
            const { packages } = action.payload;

            return {
                ...state,
                errorMessage: '',
                packages
            };
        }
        case IMAGE_INVENTORY_ERROR: {
            return {
                ...state,
                errorMessage: 'There was an error in processing your request.'
            };
        }
        default:
            return state;
    }
};

export {
    imageInventory
};
