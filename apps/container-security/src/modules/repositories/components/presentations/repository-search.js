import React from 'react';
import PropTypes from 'prop-types';
import { AdvancedSearch } from '@hivekit/advanced-search';

class RepositorySearchView extends React.Component {
    constructor () {
        super();

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit (submitOptions) {
        const { setSearchTerms } = this.props;
        // set search term in redux store
        setSearchTerms(submitOptions);
    }

    render () {
        const { recordCount } = this.props;

        return (
            <AdvancedSearch
                labelKey='repositories'
                valueKey='image name'
                onSubmit={this.handleSubmit}
                recordCount={recordCount}/>
        );
    }
}

RepositorySearchView.propTypes = {
    // Redux dispatches
    setSearchTerms: PropTypes.func.isRequired,
    recordCount: PropTypes.string
};

export {
    RepositorySearchView
};
