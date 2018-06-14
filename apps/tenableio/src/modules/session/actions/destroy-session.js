import { SESSION_DESTROY } from './types';

const sessionDestroy = () => {
    return {
        type: SESSION_DESTROY,
        payload: null
    };
};

export {
    sessionDestroy
};
