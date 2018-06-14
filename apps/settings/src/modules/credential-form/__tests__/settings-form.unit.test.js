import React from 'react';
import { shallow } from 'enzyme';
import { CredentialIcon } from '@hivekit/icon';

import { Patterns } from 'tio-common';

import * as components from '../components';
import { validationFn } from '../components/presentations/form-utils';

const {
    PlanePreviewHeader,
    HeaderIcon,
    TitleFormField,
    DescriptionFormField,
    TitleInlineEdit,
    DescriptionInlineEdit
} = Patterns.plane;

const { SettingsFormView } = components.presentations;
const {
    CredentialSelectInputComponent,
    CredentialTextInputComponent,
    CredentialCheckboxInputComponent
} = components;

describe('Settings - Credential Form Module Components - Credential Settings View', () => {
    const defaultProps = {
        configuration: [
            {
                id: 'select-input',
                type: 'select',
                required: true,
                default: 'value0',
                options: ['value0', 'value1', 'value2']
            },
            {
                id: 'text-input-1',
                type: 'text',
                required: true
            },
            {
                id: 'password-input',
                type: 'password',
                required: true
            },
            {
                id: 'text-input-2',
                type: 'text',
                required: false,
                regex: '[a-z]+'
            },
            {
                id: 'use-ssl',
                name: 'Use SSL',
                type: 'checkbox',
                required: true
            }
        ],
        name: 'Credential of Awesomeness',
        description: 'This credential is awesome and should be used in all-the-places!',
        crudAction: 'add',
        change: jest.fn(),
        clearFields: jest.fn()
    };

    it('should render a plane preview header with a form, when creating a new credential', () => {
        const component = shallow(<SettingsFormView {...defaultProps} />);
        const header = component.find(PlanePreviewHeader);

        expect(header.exists()).toBe(true);
        expect(header.props()).toMatchObject({
            iconComponent: <HeaderIcon name={CredentialIcon} />,
            contentSectionComponent: expect.anything()
        });

        const contentForm = shallow(header.prop('contentSectionComponent'));

        const titleComponent = contentForm.find(TitleFormField);
        const expectedTitle = <TitleFormField name='name' validate={[validationFn.required]} />;

        expect(titleComponent.exists()).toBe(true);
        expect(titleComponent.get(0)).toMatchObject(expectedTitle);

        const descriptionComponent = contentForm.find(DescriptionFormField);
        const expectedDescription = <DescriptionFormField name='description' />;

        expect(descriptionComponent.exists()).toBe(true);
        expect(descriptionComponent.get(0)).toMatchObject(expectedDescription);
    });

    it('should render a plane preview header with editable fields, when editing a credential', () => {
        const props = {
            ...defaultProps,
            crudAction: 'edit',
            credential: {
                name: 'JohnSnow',
                description: 'I know nothing!'
            }
        };
        const component = shallow(<SettingsFormView {...props} />);
        const header = component.find(PlanePreviewHeader);

        expect(header.exists()).toBe(true);
        expect(header.props()).toMatchObject({
            iconComponent: <HeaderIcon name={CredentialIcon} mt={0}/>,
            titleComponent: <TitleInlineEdit name='name' />,
            descriptionComponent: <DescriptionInlineEdit name='description' />
        });
    });

    it('should renders a form section with fields within the plane body', () => {
        const component = shallow(<SettingsFormView {...defaultProps} />);
        const formSection = component.find('FormSection');

        expect(formSection.exists()).toBe(true);

        const fields = formSection.find('Field');

        expect(fields.length).toBe(defaultProps.configuration.length);
    });

    it('should render select elements based on the configuration passed in', () => {
        const component = shallow(<SettingsFormView {...defaultProps} />);
        const inputs = component.find({ component: CredentialSelectInputComponent });
        const selectIndexList = [0];

        expect(inputs.exists()).toBe(true);
        expect(inputs.length).toBe(selectIndexList.length);

        for (let index = selectIndexList.length; index--;) {
            const selectIndex = selectIndexList[index];
            const entry = defaultProps.configuration[selectIndex];

            expect(inputs.at(index).props()).toMatchObject({
                name: entry.id,
                configuration: entry,
                component: CredentialSelectInputComponent,
                validate: [expect.any(Function)],
                reduxFormDispatches: {
                    change: defaultProps.change,
                    clearFields: defaultProps.clearFields
                }
            });
        }
    });

    it('should render text elements based on the configuration passed in', () => {
        const component = shallow(<SettingsFormView {...defaultProps} />);
        const inputs = component.find({ component: CredentialTextInputComponent });
        const textIndexList = [1, 2, 3];

        expect(inputs.exists()).toBe(true);
        expect(inputs.length).toBe(textIndexList.length);

        for (let index = textIndexList.length; index--;) {
            const textIndex = textIndexList[index];
            const entry = defaultProps.configuration[textIndex];

            expect(inputs.at(index).props()).toMatchObject({
                name: entry.id,
                configuration: entry,
                component: CredentialTextInputComponent,
                validate: [expect.any(Function)],
                reduxFormDispatches: {
                    change: defaultProps.change,
                    clearFields: defaultProps.clearFields
                }
            });
        }
    });

    it('should render checkbox elements based on the configuration passed in', () => {
        const component = shallow(<SettingsFormView {...defaultProps} />);
        const inputs = component.find({ component: CredentialCheckboxInputComponent });
        const checkboxIndexList = [4];

        expect(inputs.exists()).toBe(true);
        expect(inputs.length).toBe(checkboxIndexList.length);

        for (let index = checkboxIndexList.length; index--;) {
            const checkboxIndex = checkboxIndexList[index];
            const entry = defaultProps.configuration[checkboxIndex];

            expect(inputs.at(index).props()).toMatchObject({
                name: entry.id,
                configuration: entry,
                component: CredentialCheckboxInputComponent,
                validate: [expect.any(Function)],
                reduxFormDispatches: {
                    change: defaultProps.change,
                    clearFields: defaultProps.clearFields
                }
            });
        }
    });
});
