import React from 'react';
import { shallow } from 'enzyme';

import * as components from '../components';

const { CredentialSelectInputView } = components.presentations;

describe('Settings - Credential Form Module Components - Credential Select Input', () => {
    it('should render a basic select input based on configurations', () => {
        const defaultProps = {
            configuration: {
                id: 'auth_method',
                name: 'Authentication Method',
                required: true,
                type: 'select',
                default: 'password',
                options: [{
                    id: 'cyberark',
                    name: 'CyberArk'
                }, {
                    id: 'password',
                    name: 'Password'
                }]
            },
            input: {
                value: 'cyberark',
                onChange: jest.fn()
            },
            meta: {
                touched: false,
                errors: ''
            },
            reduxFormDispatches: {
                change: jest.fn(),
                clearFields: jest.fn()
            }
        };
        const component = shallow(<CredentialSelectInputView {...defaultProps} />);
        const formItem = component.find('FormItem');
        const selectInput = component.find('Select');

        expect(formItem.exists()).toBe(true);
        expect(formItem.props()).toMatchObject({
            label: defaultProps.configuration.name
        });

        expect(selectInput.exists()).toBe(true);
        expect(selectInput.props()).toMatchObject({
            value: defaultProps.input.value,
            options: [
                { value: 'cyberark', label: 'CyberArk' },
                { value: 'password', label: 'Password' }
            ],
            onChange: expect.any(Function)
        });
    });

    it('should render a select input with nested inputs under its options, based on configurations', () => {
        const defaultProps = {
            configuration: {
                id: 'auth_method',
                name: 'Authentication Method',
                required: true,
                type: 'select',
                default: 'password',
                options: [{
                    id: 'cyberark',
                    name: 'CyberArk',
                    inputs: [
                        {
                            id: 'username',
                            name: 'Username',
                            type: 'text',
                            placeholder: 'Username',
                            required: true
                        }
                    ]
                }, {
                    id: 'password',
                    name: 'Password',
                    inputs: [
                        {
                            id: 'username',
                            name: 'Username',
                            type: 'text',
                            placeholder: 'Username',
                            required: true
                        },
                        {
                            id: 'password',
                            name: 'Password',
                            type: 'password',
                            placeholder: 'Password',
                            required: true
                        }
                    ]
                }]
            },
            input: {
                value: 'password',
                onChange: jest.fn()
            },
            meta: {
                touched: false,
                errors: ''
            },
            reduxFormDispatches: {
                change: jest.fn(),
                clearFields: jest.fn()
            }
        };
        const component = shallow(<CredentialSelectInputView {...defaultProps} />);
        const formItem = component.find('FormItem');
        const selectInput = component.find('Select');
        const childInputs = component.find('Field');
        const expectedCount = 2;

        expect(formItem.exists()).toBe(true);
        expect(formItem.props()).toMatchObject({
            label: defaultProps.configuration.name
        });

        expect(selectInput.exists()).toBe(true);
        expect(selectInput.props()).toMatchObject({
            value: defaultProps.input.value,
            options: [
                { value: 'cyberark', label: 'CyberArk' },
                { value: 'password', label: 'Password' }
            ],
            onChange: expect.any(Function)
        });

        expect(childInputs.length).toBe(expectedCount);

        for (let childIndex = expectedCount; childIndex--;) {
            const input = defaultProps.configuration.options[1].inputs[childIndex];

            expect(childInputs.get(childIndex).props).toMatchObject({
                name: input.id,
                configuration: input
            });
        }
    });
});
