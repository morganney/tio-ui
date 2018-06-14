import React from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import { Select } from '@hivekit/select';

const SpecificRepositoryInputView = ({
    input,

    // Redux dispatches
    setSpecificRepositoryFilters,

    // i18n messages
    specificRepositoryPlaceholder
}) => {
    // Redux-form store data, and other consts
    const { value } = input;
    const debounceTimeInMs = 500;

    // Redux-form event handlers, to update the store
    const specificRepositoryChange = (selectOption) => {
        input.onChange(selectOption);
    };

    const debouncedFetch = debounce((textInput, reactSelectCallback) => {
        setSpecificRepositoryFilters({
            offset: 0,
            limit: 5,
            repositorySearch: textInput,
            reactSelectCallback
        });
    }, debounceTimeInMs);

    // Select event handlers
    const getRepositoryOptions = (textInput, reactSelectCallback) => {
        // If there is a string, update the filters, which kicks off a network request in our componentDidUpdate.
        // We only debounce the fetch - that way, when the component first mounts, it immediately gets to the `else` and returns an empty options array.
        if (textInput) {
            debouncedFetch(textInput, reactSelectCallback);
        } else {
            // Empty input, so just return an empty set of options
            reactSelectCallback(null, {
                options: []
            });
        }
    };

    // Props for return
    const selectProps = {
        ml: 1,
        placeholder: specificRepositoryPlaceholder,
        value,
        onChange: specificRepositoryChange,
        searchable: true,
        searchableIcon: true,
        enableAsyncSearch: true,
        loadOptions: getRepositoryOptions,
        cache: false,
        ignoreCase: false
    };

    return (
        <Select {...selectProps} />
    );
};

SpecificRepositoryInputView.propTypes = {
    input: PropTypes.object.isRequired,

    // Redux dispatches
    setSpecificRepositoryFilters: PropTypes.func.isRequired,

    // i18n strings
    specificRepositoryPlaceholder: PropTypes.string.isRequired
};

export { SpecificRepositoryInputView };
