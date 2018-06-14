import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { push, replace } from 'react-router-redux';

import { NavigationView } from '../../presentations/navigation';

const NavigationContainer = withRouter(
    connect(null, { push, replace })(NavigationView)
);

export {
    NavigationContainer
};
