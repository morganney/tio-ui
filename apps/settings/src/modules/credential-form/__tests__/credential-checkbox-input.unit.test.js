import React from 'react';
import { shallow } from 'enzyme';
import { Checkbox } from '@hivekit/checkbox';

import * as components from '../components';

const { CredentialCheckboxInputView } = components.presentations;

describe('Settings - Credential Form Module Components - Credential Checkbox Input', () => {
    const defaultProps = {
        configuration: {
            id: 'use-ssl',
            name: 'Use SSL',
            type: 'checkbox',
            required: true
        },
        input: {
            value: 'yes',
            onChange: jest.fn(),
            onBlur: jest.fn()
        },
        meta: {
            touched: false,
            error: ''
        },
        reduxFormDispatches: {
            change: jest.fn()
        }
    };

    it('should render a checkbox input based on the configurations', () => {
        const component = shallow(<CredentialCheckboxInputView {...defaultProps} />);
        const formItem = component.find('FormItem');
        const checkboxInput = component.find('Checkbox');

        expect(formItem.exists()).toBe(true);
        expect(formItem.props()).toMatchObject({
            required: defaultProps.configuration.required,
            error: '',
            mb: 2
        });

        expect(checkboxInput.exists()).toBe(true);
        expect(checkboxInput.get(0)).toMatchObject(
            <Checkbox
                onChange={expect.any(Function)}
                onBlur={defaultProps.input.onBlur}
                label={defaultProps.configuration.name}
                value={defaultProps.input.value}
                checked={true} />
        );
    });

    it('should render the checkbox unchecked, if the value is set to "no"', () => {
        const props = {
            ...defaultProps,
            input: {
                value: 'no'
            }
        };
        const component = shallow(<CredentialCheckboxInputView {...props} />);
        const checkboxInput = component.find('Checkbox');

        expect(checkboxInput.props()).toMatchObject({
            checked: false
        });
    });
});
