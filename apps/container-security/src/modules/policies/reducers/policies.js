import { POLICIES_SUCCESS } from '../actions/types';

const initialState = {
    items: [],
    pagination: {
        offset: 0,
        limit: 0,
        total: 0
    }
};
const policies = (state = initialState, action) => {
    switch (action.type) {
        case POLICIES_SUCCESS: {
            const { items } = action.payload;
            let { pagination } = action.payload;

            // TODO: remove this `if` when the consec v2 APIs match the t.io service-side pagination spec
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
    policies
};
