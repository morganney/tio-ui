import React from 'react';
import { Field } from 'redux-form';

import * as Validation from 'tio-app/validation';

import {
    CredentialSelectInputComponent,
    CredentialTextInputComponent,
    CredentialCheckboxInputComponent
} from '../';

const validationFn = {
    required: (value) => {
        if (!Validation.required(value)) {
            return Validation.required.message;
        }
    },
    regex: {
        cache: {},
        get: (regex) => {
            return (value) => {
                if (!Validation.regex(value, regex)) {
                    return Validation.regex.message;
                }
            };
        }
    }
};

const getOptionInputs = (value, options) => {
    if (Array.isArray(options)) {
        const optionMatches = options.filter((entry) => {
            return entry.id === value;
        });

        if (optionMatches.length && Array.isArray(optionMatches[0].inputs)) {
            return optionMatches[0].inputs.map((entry) => {
                return entry.id;
            });
        }
    }

    return [];
};

const renderCredentialFormInputs = (inputList, reduxFormDispatches) => {
    const elements = [];

    for (let inputIndex = 0, inputListLength = inputList.length; inputIndex < inputListLength; inputIndex++) {
        const input = inputList[inputIndex];
        const { id, type, required, regex } = input;
        const props = {
            key: id,
            name: id,
            validate: []
        };

        if (required) {
            props.validate.push(validationFn.required);
        }

        if (regex) {
            // Regex validation functions need to be retrieved from cache; otherwise a new regex function function
            // will be generated every re-render, which will cause the field to unregister/register with redux-form,
            // which will lose any error messages that the validation function previous caught.
            if (!validationFn.regex.cache[regex]) {
                validationFn.regex.cache[regex] = validationFn.regex.get(regex);
            }

            props.validate.push(validationFn.regex.cache[regex]);
        }

        switch (type) {
            case 'select':
                elements.push(
                    <Field
                        {...props}
                        configuration={input}
                        reduxFormDispatches={reduxFormDispatches}
                        component={CredentialSelectInputComponent} />
                );
                break;
            case 'password':
            case 'text':
                elements.push(
                    <Field
                        {...props}
                        configuration={input}
                        reduxFormDispatches={reduxFormDispatches}
                        component={CredentialTextInputComponent} />
                );
                break;
            case 'checkbox':
                elements.push(
                    <Field
                        {...props}
                        configuration={input}
                        reduxFormDispatches={reduxFormDispatches}
                        component={CredentialCheckboxInputComponent} />
                );
        }
    }

    return elements;
};

export {
    validationFn,
    getOptionInputs,
    renderCredentialFormInputs
};
