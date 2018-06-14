import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormItem } from '@hivekit/form';
import { Select } from '@hivekit/select';

import * as FormUtils from './form-utils';

class CredentialSelectInputView extends Component {
    static propTypes = {
        /**
         * The configuration for this input
         */
        configuration: PropTypes.object.isRequired,
        /**
         * Redux form input settings
         */
        input: PropTypes.object,
        /**
         * Additional redux form information (like error messages, touched flag, etc.)
         */
        meta: PropTypes.object,
        /**
         * Redux Form Dispatches attached to the form
         */
        reduxFormDispatches: PropTypes.object
    };

    constructor (props) {
        super(props);

        this.handleChangeEvent = this.handleChangeEvent.bind(this);
    }

    componentDidMount () {
        const {
            configuration: {
                default: defaultValue = '',
                id
            },
            input: {
                value = ''
            },
            reduxFormDispatches: {
                change
            }
        } = this.props;

        if (value === '' && defaultValue !== '') {
            change(id, defaultValue);
        }
    }

    handleChangeEvent (selection) {
        const {
            input: { value, onChange },
            configuration: { options },
            reduxFormDispatches: { clearFields }
        } = this.props;
        const inputList = FormUtils.getOptionInputs(value, options);

        /**
         * Since "cousin" inputs (those inputs that descend from different parent values of the same select
         * input) can sometimes have the same id (like re-using the username field), any value from the
         * previous field will be accidentally reused for the new field (because redux-form isn't disguishing
         * them by their form position but rather by their ids... which match... because of reasons).
         *
         * Therefore, these fields need to be cleared of their values first before the new fields are rendered.
         */
        if (inputList.length) {
            clearFields(false, false, ...inputList);
        }

        onChange(selection.value);
    }

    renderSelect () {
        const {
            configuration: { name, options, required },
            input: { value, onBlur },
            meta: { touched, error }
        } = this.props;
        const optionsList = options.map(({ id, name: label }) => {
            return {
                value: id,
                label
            };
        });

        return (
            <FormItem label={name} required={required} error={touched && error ? error : ''} mb={2}>
                <Select
                    value={value}
                    options={optionsList}
                    onChange={this.handleChangeEvent}
                    onBlur={onBlur} />
            </FormItem>
        );
    }

    renderSelectOptionChildInputs () {
        const {
            configuration: { options },
            input: { value },
            reduxFormDispatches
        } = this.props;
        const optionMatches = options.filter((entry) => {
            return entry.id === value;
        });

        if (optionMatches.length) {
            const inputs = optionMatches[0].inputs || [];

            return FormUtils.renderCredentialFormInputs(inputs, reduxFormDispatches);
        }
    }

    render () {
        return (
            <div>
                {this.renderSelect()}
                {this.renderSelectOptionChildInputs()}
            </div>
        );
    }
}

export {
    CredentialSelectInputView
};
