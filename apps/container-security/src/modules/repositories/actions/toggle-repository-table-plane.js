import { TOGGLE_REPOSITORY_TABLE_PLANE } from './types';

const toggleRepositoryTablePlane = (displayType = 'closed') => {
    return {
        type: TOGGLE_REPOSITORY_TABLE_PLANE,
        payload: displayType
    };
};

export {
    toggleRepositoryTablePlane
};
