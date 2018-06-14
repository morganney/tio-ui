import { Component } from 'react';
import PropTypes from 'prop-types';

class DashboardLifecycles extends Component {
    static propTypes = {
        // Component
        tioRender: PropTypes.func.isRequired,

        // Redux dispatches
        fetchOrganizationStats: PropTypes.func.isRequired
    }

    componentDidMount () {
        const { fetchOrganizationStats } = this.props;

        fetchOrganizationStats();
    }

    render () {
        return this.props.tioRender(this.props);
    }
}

export {
    DashboardLifecycles
};
