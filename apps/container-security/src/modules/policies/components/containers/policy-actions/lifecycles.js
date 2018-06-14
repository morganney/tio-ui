import React, { Component } from 'react';

import { PolicyActionsView } from '../../presentations';

class PolicyActionsLifecycles extends Component {
    render () {
        return (
            <PolicyActionsView {...this.props} />
        );
    }
}

export {
    PolicyActionsLifecycles
};
