import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { SpecificRepositoryInputView } from '../../../presentations';

class SpecificRepositoryInputLifecycles extends Component {
    static propTypes = {
        // Redux data
        specificRepositoryFilters: PropTypes.object,
        repositories: PropTypes.object,

        // Redux dispatches
        fetchRepositories: PropTypes.func.isRequired
    }

    componentDidUpdate (prevProps) {
        const {
            specificRepositoryFilters,
            repositories: repositoryData,
            fetchRepositories
        } = this.props;
        const { specificRepositoryFilters: prevRepositoryFilters } = prevProps;

        if (specificRepositoryFilters) {
            const { repositorySearch } = specificRepositoryFilters;
            let prevSearch = null;

            // This conditional is set up, so that on the very first keystroke, we still fall into the `else` block below
            // Basically before prevProps are set, so we do 'p' === null ? callback() : fetchRepositories()
            if (prevRepositoryFilters) {
                prevSearch = prevRepositoryFilters.repositorySearch;
            }

            // If the search terms are equivalent between props and store, we assume fetchRepositories() was already executed
            if (repositorySearch === prevSearch) {
                const { reactSelectCallback } = specificRepositoryFilters;
                const repositoryOptions = repositoryData.items.map((repo) => {
                    const { id, name } = repo;

                    return {
                        value: id,
                        label: name
                    };
                });

                reactSelectCallback(null, {
                    options: repositoryOptions
                });
            } else {
                // If the search terms in props and the store are different, run the search with the new terms
                // The idea is this kicks off another componentDidUpdate which triggers the above conditional.
                fetchRepositories(specificRepositoryFilters);
            }
        }
    }

    render () {
        return (
            <SpecificRepositoryInputView {...this.props} />
        );
    }
}

export {
    SpecificRepositoryInputLifecycles
};
