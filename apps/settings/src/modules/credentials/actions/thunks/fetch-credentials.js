import { STANDARD_API_ACTION } from 'tio-alloy';

import {
    GET_CREDENTIALS_REQUEST,
    GET_CREDENTIALS_SUCCESS,
    GET_CREDENTIALS_ERROR
} from '../types';
import {
    BRANCH_NAME,
    STEM_NAME
} from '../../constants';

const fetchCredentials = () => {
    return (dispatch, getState) => {
        const path = '/credentials';
        const stem = getState()[BRANCH_NAME][STEM_NAME];
        const {
            offset,
            limit,
            sorts = [],
            filters = [],
            search,
            search_type: searchType
        } = stem.credentialsFetchOptions;

        const wildcardFields = stem.credentialsFilters.wildcard_fields || [];

        let url = `${path}?offset=${offset}&limit=${limit}`;

        if (sorts.length) {
            const sortsString = sorts.map((sort) => {
                return `${sort.name}:${sort.order}`;
            }).join(',');

            url = `${url}&sort=${sortsString}`;
        }

        if (filters.length) {
            const filtersString = filters.reduce((str, filter) => {
                return `${str}&f=${filter.name}:${filter.typeCheck}:${filter.values}`;
            }, '');

            url = `${url}${filtersString}&ft=${searchType}`;
        }

        if (search) {
            url = `${url}&wf=${wildcardFields.join(',')}&w=${search}`;
        }

        dispatch({
            type: STANDARD_API_ACTION,
            meta: {
                types: [
                    GET_CREDENTIALS_REQUEST,
                    GET_CREDENTIALS_SUCCESS,
                    GET_CREDENTIALS_ERROR
                ],
                request: url
            }
        });
    };
};

export {
    fetchCredentials
};
