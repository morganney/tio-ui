import React, { Component } from 'react';

import { PolicyFormHeaderView } from '../../presentations';

class PolicyFormHeaderLifecycles extends Component {
    render () {
        return (
            <PolicyFormHeaderView {...this.props} />
        );
    }
}

export {
    PolicyFormHeaderLifecycles
};
