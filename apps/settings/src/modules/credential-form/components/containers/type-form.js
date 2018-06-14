import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { BRANCH_NAME, STEM_NAME } from '../../constants';
import { TypeFormView } from '../presentations';
import {
    fetchConfigurationsList,
    setSearch
} from '../../actions';

class TypeFormLifeCycles extends Component {
    static propTypes = {
        // Data entries
        configurationsList: PropTypes.array.isRequired,

        // Dispatches
        fetchConfigurationsList: PropTypes.func.isRequired
    };

    componentDidMount () {
        const { configurationsList } = this.props;

        if (configurationsList.length === 0) {
            this.props.fetchConfigurationsList();
        }
    }

    render () {
        return (
            <TypeFormView {...this.props} />
        );
    }
}

const mapStateToProps = (state) => {
    const { configurationsList, search } = state[BRANCH_NAME][STEM_NAME];

    return {
        search,
        configurationsList
    };
};

const mapDispatchToProps = {
    fetchConfigurationsList,
    setSearch
};

const TypeFormContainer = withRouter(
    connect(mapStateToProps, mapDispatchToProps)(TypeFormLifeCycles)
);

export {
    TypeFormContainer
};
