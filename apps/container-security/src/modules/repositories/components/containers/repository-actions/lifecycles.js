import React, { Component } from 'react';

import { RepositoryActionsView } from '../../presentations';

class RepositoryActionsLifecycles extends Component {
    render () {
        return (
            <RepositoryActionsView {...this.props} />
        );
    }
}

export {
    RepositoryActionsLifecycles
};
