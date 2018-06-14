import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AdvancedSearch } from '@hivekit/advanced-search';

const scoreOperatorApiValueMap = {
    equal: 'EQ',
    greaterThanOrEqual: 'GTE',
    lessThanOrEqual: 'LTE'
};

class ImagesAdvancedSearchView extends Component {
    static propTypes = {
        // Redux data fields
        images: PropTypes.object.isRequired,
        filters: PropTypes.array.isRequired,
        advancedSearchFilters: PropTypes.object.isRequired,

        // Dispatches
        setAdvancedSearchFilters: PropTypes.func.isRequired,

        // il8n messages
        searchRecordLabel: PropTypes.string.isRequired
    }

    constructor () {
        super();

        this.search = this.search.bind(this);
        this.clearFilters = this.clearFilters.bind(this);
    }

    search (query) {
        const { setAdvancedSearchFilters } = this.props;
        const { search, filters } = query;

        const parsedAPIFilters = this.parseApiSearchFilters(filters);
        const parsedAppliedSearchFilters = this.parseAppliedSearchFilter(filters);

        if (search) {
            parsedAPIFilters.nameContains = search;
        }

        // Save both API and component ready filter formats for ease of use
        setAdvancedSearchFilters({ apiFilters: parsedAPIFilters, componentFilters: parsedAppliedSearchFilters });
    }

    // Format filters for api request query
    parseApiSearchFilters (filters) {
        const parsedAPIFilters = {};
        const riskScoreName = 'score';
        const hasMalwareName = 'hasMalware';

        filters.forEach((filter) => {
            switch (filter.name) {
                case riskScoreName: {
                    const { scoreValue, scoreOperatorValue } = this.formatRiskScoreParameters(filter);

                    parsedAPIFilters.scoreOperator = scoreOperatorValue;
                    parsedAPIFilters.score = scoreValue;

                    break;
                }
                case hasMalwareName:
                    parsedAPIFilters.hasMalware = this.formatMalwareParameters(filter);

                    break;
                default:
                    parsedAPIFilters[filter.name] = filter.values;
            }
        });

        return parsedAPIFilters;
    }

    // Format filters for AdvancedSearch ``filterItems`` parameter consumption
    parseAppliedSearchFilter (filters) {
        const parsedAppliedSearchFilters = filters.map((filter) => {
            const { name, values, typeCheck } = filter;

            return {
                name,
                options: [
                    values
                ],
                operator: typeCheck
            };
        });

        return parsedAppliedSearchFilters;
    }

    formatRiskScoreParameters (filter) {
        const { equal, greaterThanOrEqual, lessThanOrEqual } = scoreOperatorApiValueMap;
        const scoreValue = filter.values;
        let scoreOperatorValue = equal;

        switch (filter.typeCheck) {
            case 'gte':
                scoreOperatorValue = greaterThanOrEqual;
                break;
            case 'lte':
                scoreOperatorValue = lessThanOrEqual;
                break;
            default:
                break;
        }

        return {
            scoreValue,
            scoreOperatorValue
        };
    }

    formatMalwareParameters (filter) {
        return filter.values === 'Has malware';
    }

    clearFilters () {
        const { setAdvancedSearchFilters } = this.props;

        setAdvancedSearchFilters();
    }

    render () {
        const { images, searchRecordLabel, filters, advancedSearchFilters } = this.props;
        let count = 0;

        if (images && images.pagination) {
            count = images.pagination.total;
        }

        return (
            <AdvancedSearch
                legacy={true}
                recordLabel={searchRecordLabel}
                filterOptions={filters}
                filterItems={advancedSearchFilters.componentFilters}
                onSubmit={this.search}
                onClearFilters={this.clearFilters}
                recordCount={count.toString()} />
        );
    }
}

export {
    ImagesAdvancedSearchView
};
