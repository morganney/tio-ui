import { REPOSITORIES_SUCCESS } from '../actions/types';

const defaultState = {
    items: [],
    pagination: {
        offset: 0,
        limit: 0,
        total: 0
    }
};
const repositories = (state = defaultState, action) => {
    switch (action.type) {
        case REPOSITORIES_SUCCESS: {
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
    repositories
};
