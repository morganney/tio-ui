import { TOGGLE_CONTAINER_TAGS_TABLE_PLANE } from './types';

const toggleContainerTagsTablePlane = (displayType = 'closed') => {
    return {
        type: TOGGLE_CONTAINER_TAGS_TABLE_PLANE,
        payload: displayType
    };
};

export {
    toggleContainerTagsTablePlane
};
