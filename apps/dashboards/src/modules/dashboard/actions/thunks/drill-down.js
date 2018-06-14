import { push } from 'react-router-redux';

import { updateFiltersDrilldown } from 'tio-vm/modules/vulnerabilities/actions';

const drillDown = (path, filters) => {
    return (dispatch) => {
        if (filters) {
            dispatch(updateFiltersDrilldown(filters));
        }

        dispatch(push(path));
    };
};

export {
    drillDown
};
