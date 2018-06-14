import { CONTAINER_IMAGES_SUCCESS } from '../actions/types';

const defaultState = {
    items: []
};
const containerImages = (state = defaultState, action) => {
    switch (action.type) {
        case CONTAINER_IMAGES_SUCCESS: {
            const { items } = action.payload;
            let { pagination } = action.payload;

            // TODO: remove this `if` when the consec APIs wrap pagination correctly
            if (!pagination) {
                const { offset, limit, total } = action.payload;

                pagination = {
                    offset,
                    limit,
                    total
                };
            }

            return {
                ...state,
                items,
                pagination
            };
        }
        default:
            return state;
    }
};

export {
    containerImages
};
