import React, { Component } from 'react';

import { PolicyFormFooterView } from '../../presentations';

class PolicyFormFooterLifecycles extends Component {
    render () {
        return (
            <PolicyFormFooterView {...this.props} />
        );
    }
}

export {
    PolicyFormFooterLifecycles
};
