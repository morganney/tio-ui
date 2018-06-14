import React from 'react';
import { shallow } from 'enzyme';

import * as components from '../components';

const { CredentialTextInputView } = components.presentations;

describe('Settings - Credential Form Module Components - Credential Text Input', () => {
    const defaultProps = {
        configuration: {
            id: 'username',
            name: 'Username',
            type: 'text',
            placeholder: 'Username',
            required: true
        },
        input: {
            value: 'JohnCena9001',
            onChange: jest.fn()
        },
        meta: {
            touched: false,
            error: ''
        },
        reduxFormDispatches: {
            change: jest.fn(),
            clearFields: jest.fn()
        }
    };
    let component = null;

    beforeEach(() => {
        component = shallow(<CredentialTextInputView {...defaultProps} />);
    });

    it('should render a text input based on configurations', () => {
        const formItem = component.find('FormItem');
        const textInput = component.find('TextInput');

        expect(formItem.props()).toMatchObject({
            label: defaultProps.configuration.name,
            required: defaultProps.configuration.required
        });

        expect(textInput.props()).toMatchObject({
            placeholder: defaultProps.configuration.placeholder,
            type: defaultProps.configuration.type,
            value: defaultProps.input.value,
            onChange: expect.any(Function)
        });
    });
});
