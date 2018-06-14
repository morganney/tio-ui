import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { localeChange } from '../../actions';
import { BRANCH_NAME } from '../../constants';
import locales from '../../locales';
import Selector from '../views/selector';

const mapStateToProps = (state) => {
    const branch = state[BRANCH_NAME];
    const { locale: current } = branch;

    if (current) {
        localStorage.setItem('tioLocale', current);
    }

    return {
        locales,
        current
    };
};
const mapDispatchToProps = (dispatch, { onLocaleChange }) => {
    return {
        onLocaleChange: (locale) => {
            dispatch(localeChange(locale, onLocaleChange));
        }
    };
};
const SelectorContainer = withRouter(
    connect(mapStateToProps, mapDispatchToProps)(Selector)
);

export default SelectorContainer;
