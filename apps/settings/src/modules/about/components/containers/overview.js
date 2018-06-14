import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// TODO: Change this to selectors once selectors start being used
import {
    BRANCH_NAME as CORE_BRANCH_NAME,
    STEM_NAME as CORE_STEM_NAME
} from 'tio-app/modules/session/constants';

import { OverviewView } from './../presentations';

const mapStateToProps = (state) => {
    const {
        credentials_mgmt: credentialsMgmt,
        // TODO: Replace with the real connectors feature flag, once defined
        connectors_gen2: connectors,
        // TODO: Replace with the real settings migration feature flag, once defined
        settings_gen2: settings
    } = state[CORE_BRANCH_NAME][CORE_STEM_NAME].activeFeatures;

    return {
        featureFlags: {
            // Setting them to a default value
            credentialsMgmt: credentialsMgmt || false,
            connectors: connectors || false,
            settings: settings || false
        }
    };
};

const OverviewContainer = withRouter(
    connect(mapStateToProps)(OverviewView)
);

export {
    OverviewContainer
};
