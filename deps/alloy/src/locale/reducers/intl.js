import { intlReducer, initialState } from 'react-intl-redux';

const intl = (state = initialState, action) => {
    return intlReducer(state, action);
};

export default intl;
