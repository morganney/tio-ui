import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Store } from 'tio-alloy';
import { historyListener } from 'schedule/utils';

import { ScheduleView } from '../../presentations/schedule';

class ScheduleLifecycle extends Component {
    static propTypes = {
        destroy: PropTypes.func.isRequired,
        form: PropTypes.string.isRequired
    }

    componentDidMount () {
        /**
         * Would rather use middleware to listen for react-router LOCATION_CHANGE
         * and then dispatch redux-form's destroy action from there, but alloy
         * currently doesn't support adding custom middleware.
         */
        if (!historyListener.instance) {
            historyListener.instance = Store.getHistory().listen(() => {
                const { form, destroy } = this.props;

                if (Store.getState().form[form]) {
                    destroy();
                }
            });
        }
    }

    render () {
        return <ScheduleView { ...this.props } />;
    }
}

export {
    ScheduleLifecycle
};
