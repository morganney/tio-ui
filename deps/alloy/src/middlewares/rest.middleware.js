import { STANDARD_API_ACTION } from '../action-types';
import Rest from '../api';

const restMiddleware = ({ dispatch, getState }) => {
    return (next) => {
        return (action) => {
            const { type, meta = { types: [] } } = action;
            const [request, success, failure] = meta.types || [];
            const fetch = async () => {
                let response = null;

                try {
                    response = await Rest.fetch(meta.request);
                } catch (error) {
                    dispatch({
                        type: failure,
                        payload: error,
                        meta: action.payload,
                        error: true
                    });
                }

                if (response) {
                    if (typeof meta.processResponseBeforeDispatch === 'function') {
                        response = meta.processResponseBeforeDispatch(response);
                    }

                    dispatch({
                        type: success,
                        payload: response
                    });
                }
            };

            if (type !== STANDARD_API_ACTION) {
                return next(action);
            }

            // should only check if the dev wants to verify something in state first. If a dev does not define a "shouldFetch" method this will always fetch the config.
            if (typeof meta.shouldFetch === 'function' && !meta.shouldFetch(getState())) {
                return;
            }

            dispatch({
                type: request,
                payload: action.payload
            });

            return fetch();
        };
    };
};

export default restMiddleware;
