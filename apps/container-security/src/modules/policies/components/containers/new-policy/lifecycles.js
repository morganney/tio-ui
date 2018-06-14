import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { NewPolicyView } from 'tio-container-security/modules/policies/components/presentations';

class NewPolicyLifecycles extends Component {
    static propTypes = {
        // Redux dispatches
        toggleNewPolicyPlane: PropTypes.func.isRequired
    }

    componentDidMount () {
        // On component mount via react-router, open the plane.
        const { toggleNewPolicyPlane } = this.props;

        toggleNewPolicyPlane('partial');
    }

    render () {
        return (
            <NewPolicyView {...this.props} />
        );
    }
}

export {
    NewPolicyLifecycles
};
