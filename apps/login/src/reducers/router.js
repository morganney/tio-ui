import { LOCATION_CHANGE, routerReducer } from 'react-router-redux';

const router = (state = { location: null }, action) => {
    switch (action.type) {
        case LOCATION_CHANGE: {
            const next = routerReducer(state, action);

            // Browser reloaded so clear any location.state
            if (!state.location) {
                next.location.state = null;
            }

            return { ...state, ...next };
        }
        default:
            return state;
    }
};

export default router;
