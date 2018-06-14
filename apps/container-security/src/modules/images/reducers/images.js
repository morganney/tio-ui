import {
    IMAGES_SUCCESS,
    IMAGES_ERROR
} from '../actions/types';

const images = (state = { items: [], pagination: { offset: 0, limit: 0, total: 0 } }, action) => {
    switch (action.type) {
        case IMAGES_SUCCESS: {
            const { items } = action.payload;
            let { pagination } = action.payload;

            if (!pagination) {
                const { offset, limit, total } = action.payload;

                pagination = {
                    offset,
                    limit,
                    total
                };
            }

            if (Array.isArray(items)) {
                for (let i = items.length; i--;) {
                    const image = items[i];

                    image.id = image.imageHash;
                }
            }

            return {
                ...state,
                errorMessage: '',
                items,
                pagination
            };
        }
        case IMAGES_ERROR: {
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
    images
};
