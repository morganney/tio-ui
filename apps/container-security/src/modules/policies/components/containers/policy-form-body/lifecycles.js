import React, { Component } from 'react';

import { PolicyFormBodyView } from '../../presentations';

class PolicyFormBodyLifecycles extends Component {
    render () {
        return (
            <PolicyFormBodyView {...this.props} />
        );
    }
}

export {
    PolicyFormBodyLifecycles
};
