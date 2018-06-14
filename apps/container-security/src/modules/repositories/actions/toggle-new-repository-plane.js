import { TOGGLE_NEW_REPOSITORY_PLANE } from './types';

const toggleNewRepositoryPlane = (displayType = 'closed') => {
    return {
        type: TOGGLE_NEW_REPOSITORY_PLANE,
        payload: displayType
    };
};

export {
    toggleNewRepositoryPlane
};
