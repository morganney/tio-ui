import React, { Fragment } from 'react';
import { shallow } from 'enzyme';
import { Field } from 'redux-form';
import { colors, fontSizes } from '@hivekit/core';
import { InlineEdit } from '@hivekit/inline-edit';
import { FormItem } from '@hivekit/form';
import { TextInput } from '@hivekit/text-input';
import { TextArea } from '@hivekit/text-area';
import { PlaceholderIcon } from '@hivekit/icon';
import { H2 } from '@hivekit/header';
import { ContentBox } from '@hivekit/content-box';
import { Text } from '@hivekit/text';

import {
    HeaderBadge,
    HeaderIcon,
    TitleView,
    DescriptionView,
    HeaderInlineEdit,
    TitleInlineEdit,
    DescriptionInlineEdit,
    TitleFormField,
    DescriptionFormField,
    PlanePreviewHeader
} from './../plane-preview-header';

describe('Tenable.io Patterns -- Plane -- Plane Preview Header', () => {
    it('should render a header badge', () => {
        const component = shallow(<HeaderBadge color={colors.actionBlue}>4.5</HeaderBadge>);

        expect(component.props()).toMatchObject({
            mt: 1,
            pl: '0px',
            pr: '0px',
            borderThickness: '0px',
            minWidth: '51px',
            fontSize: 0,
            lineHeight: fontSizes[2],
            backgroundColor: colors.statusYellow,
            color: colors.actionBlue
        });
        expect(component.childAt(0).text()).toEqual('4.5');
    });

    it('should render a header icon', () => {
        const component = shallow(<HeaderIcon name={PlaceholderIcon} />);

        expect(component.get(0)).toMatchObject(<PlaceholderIcon size={1} mt='0px' color={colors.actionBlueDark} />);
    });

    it('should render the title view', () => {
        const props = {
            value: 'JohnSnow'
        };

        const component = shallow(<TitleView {...props} />);
        const expectedTitle = (
            <H2>
                JohnSnow
            </H2>
        );

        expect(component.get(0)).toMatchObject(expectedTitle);
    });

    it('should render the description view', () => {
        const props = {
            value: 'I know nothing!',
            expandable: false,
            maxDisplayLines: 100
        };

        const component = shallow(<DescriptionView {...props} />);
        const expectedDescription = (
            <ContentBox
                width='100%'
                mt={1}
                expandable={false}
                maxDisplayLines={100}
                size={0}>
                <Text
                    color={colors.grayDark}
                    size={0}
                    lineHeight={fontSizes[2]}>
                    I know nothing!
                </Text>
            </ContentBox>
        );

        expect(component.get(0)).toMatchObject(expectedDescription);
    });

    it('should render an inline header field', () => {
        const props = {
            name: 'name',
            configuration: {
                size: 4,
                header: true,
                placeholder: 'Enter a name'
            }
        };
        const reduxProps = {
            input: {
                value: 'Test',
                onChange: jest.fn()
            }
        };

        const component = shallow(<HeaderInlineEdit {...props} />);
        const expectedField = <Field name='name' />;

        expect(component.get(0)).toMatchObject(expectedField);

        const expectedComponent = <InlineEdit {...props.configuration} text='Test' onUpdate={expect.any(Function)} />;
        const actualComponent = component.prop('component')(reduxProps);

        expect(actualComponent).toMatchObject(expectedComponent);
    });

    it('should render a title inline edit field', () => {
        const configuration = {
            size: 4,
            header: true,
            placeholder: 'Enter a name'
        };
        const expectedComponent = <HeaderInlineEdit name='name' configuration={configuration} />;
        const actualComponent = shallow(<TitleInlineEdit name='name' />);

        expect(actualComponent.get(0)).toMatchObject(expectedComponent);
    });

    it('should render a description inline edit field', () => {
        const configuration = {
            color: colors.grayDark,
            type: 'textArea',
            size: 0,
            placeholder: 'Enter a description'
        };
        const expectedComponent = <HeaderInlineEdit name='description' configuration={configuration} />;
        const actualComponent = shallow(<DescriptionInlineEdit name='description' />);

        expect(actualComponent.get(0)).toMatchObject(expectedComponent);
    });

    it('should render a title form field', () => {
        const reduxProps = {
            input: {
                value: 'Infinity Gauntlet Safe Combination',
                onChange: jest.fn()
            },
            meta: {
                touched: false,
                error: ''
            }
        };

        const component = shallow(<TitleFormField name='name' validate={[jest.fn()]} />);
        const expectedField = <Field name='name' validate={[expect.any(Function)]} />;

        expect(component.get(0)).toMatchObject(expectedField);

        const expectedComponent = (
            <FormItem error='' required={true} mb='0px'>
                <TextInput
                    {...reduxProps.input}
                    placeholder='Enter a name'
                />
            </FormItem>
        );
        const actualComponent = component.prop('component')(reduxProps);

        expect(actualComponent).toMatchObject(expectedComponent);
    });

    it('should render a title form field with errors', () => {
        const reduxProps = {
            input: {
                value: 'Infinity Gauntlet Safe Combination',
                onChange: jest.fn()
            },
            meta: {
                touched: true,
                error: 'Invalid value.'
            }
        };
        const component = shallow(<TitleFormField name='name' validate={[jest.fn()]} />);

        const formItem = component.prop('component')(reduxProps);
        expect(formItem.props.error).toEqual(reduxProps.meta.error);
    });

    it('should render a description form field', () => {
        const reduxProps = {
            input: {
                value: 'Only those who embrace their destiny can wield this combination!',
                onChange: jest.fn()
            },
            meta: {
                touched: false,
                error: ''
            }
        };

        const component = shallow(<DescriptionFormField name='description' />);
        const expectedField = <Field name='description' />;

        expect(component.get(0)).toMatchObject(expectedField);

        const expectedComponent = (
            <FormItem error='' mt={2} mb='0px'>
                <TextArea
                    {...reduxProps.input}
                    width='100%'
                    placeholder='Enter a description'
                />
            </FormItem>
        );
        const actualComponent = component.prop('component')(reduxProps);

        expect(actualComponent).toMatchObject(expectedComponent);
    });

    it('should render a description form field with errors', () => {
        const reduxProps = {
            input: {
                value: 'Only those who embrace their destiny can wield this combination!',
                onChange: jest.fn()
            },
            meta: {
                touched: true,
                error: 'Not worthy enough.'
            }
        };
        const component = shallow(<DescriptionFormField name='description' validate={[jest.fn()]} />);

        const formItem = component.prop('component')(reduxProps);
        expect(formItem.props.error).toEqual(reduxProps.meta.error);
    });

    it('should render a plane preview header', () => {
        const props = {
            iconComponent: <HeaderIcon name={PlaceholderIcon} />,
            titleComponent: <TitleInlineEdit name='name' />,
            descriptionComponent: <DescriptionInlineEdit name='description' />
        };

        const component = shallow(<PlanePreviewHeader {...props} />).childAt(0);

        expect(component.props()).toMatchObject({
            width: '100%',
            pb: 2
        });

        const iconSectionComponent = component.childAt(0);

        expect(iconSectionComponent.props()).toMatchObject({
            width: '10%',
            pr: '0px'
        });
        expect(iconSectionComponent.childAt(0).props()).toMatchObject({
            alignItems: 'flex-start',
            flexDirection: 'column',
            justifyContent: 'center',
            width: '100%'
        });
        expect(iconSectionComponent.childAt(0).childAt(0).childAt(0).get(0)).toMatchObject(props.iconComponent);

        const contentSectionComponent = component.childAt(1);

        expect(contentSectionComponent.props()).toMatchObject({
            width: '90%',
            pl: 2
        });
        expect(contentSectionComponent.childAt(0).get(0)).toMatchObject(
            <Fragment>
                {props.titleComponent}
                {props.descriptionComponent}
            </Fragment>
        );
    });

    it('should render a plane preview header with a badge', () => {
        const props = {
            iconComponent: <HeaderIcon name={PlaceholderIcon} />,
            badgeComponent: <HeaderBadge>4.5</HeaderBadge>,
            titleComponent: <TitleInlineEdit name='name' />,
            descriptionComponent: <DescriptionInlineEdit name='description' />
        };

        const component = shallow(<PlanePreviewHeader {...props} />).childAt(0);
        const iconSectionComponents = component.childAt(0).childAt(0);
        const expectedNumberOfChildren = 2;

        expect(iconSectionComponents.children().length).toEqual(expectedNumberOfChildren);
        expect(iconSectionComponents.childAt(0).childAt(0).get(0)).toMatchObject(props.iconComponent);
        expect(iconSectionComponents.childAt(1).props()).toMatchObject({ pl: '3px' });
        expect(iconSectionComponents.childAt(1).childAt(0).get(0)).toMatchObject(props.badgeComponent);
    });

    it('should render a plane preview header with only a title', () => {
        const props = {
            iconComponent: <HeaderIcon name={PlaceholderIcon} />,
            titleComponent: <TitleInlineEdit name='name'/>
        };

        const component = shallow(<PlanePreviewHeader {...props} />).childAt(0);
        const contentSectionComponent = component.childAt(1);
        const expectedNumberOfChildren = 1;

        expect(contentSectionComponent.props()).toMatchObject({
            width: '90%',
            pl: 2
        });
        expect(contentSectionComponent.childAt(0).children().length).toEqual(expectedNumberOfChildren);
        expect(contentSectionComponent.childAt(0).childAt(0).get(0)).toMatchObject(props.titleComponent);
    });

    it('should render a plane preview header with a custom icon and content section', () => {
        const props = {
            iconSectionComponent: <Text>This is my custom icon section</Text>,
            contentSectionComponent: <Text>This is my custom content section</Text>
        };

        const component = shallow(<PlanePreviewHeader {...props} />).childAt(0);
        const iconSectionComponent = component.childAt(0);

        expect(iconSectionComponent.props()).toMatchObject({
            width: '10%',
            pr: '0px'
        });
        expect(iconSectionComponent.childAt(0).get(0)).toMatchObject(props.iconSectionComponent);

        const contentSectionComponent = component.childAt(1);

        expect(contentSectionComponent.props()).toMatchObject({
            width: '90%',
            pl: 2
        });
        expect(contentSectionComponent.childAt(0).get(0)).toMatchObject(props.contentSectionComponent);
    });
});
