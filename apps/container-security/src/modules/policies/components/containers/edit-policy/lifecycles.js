import React, { Component } from 'react';

import { EditPolicyView } from '../../presentations';

class EditPolicyLifecycles extends Component {
    render () {
        return (
            <EditPolicyView {...this.props} />
        );
    }
}

export {
    EditPolicyLifecycles
};
