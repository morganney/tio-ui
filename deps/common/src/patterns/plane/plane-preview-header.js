/**
 * Example Usage:
 *
 * import { PlaceholderIcon } from '@hivekit/icon';
 * import { Patterns } from tio-common;
 *
 * const { PlanePreviewHeader, TitleView } = Patterns.plane;
 *
 * <PlanePreviewHeader
 *     iconComponent={<HeaderIcon name={PlaceholderIcon} />}
 *     titleComponent={<TitleView value='This is my title' />} />
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { colors, fontSizes } from '@hivekit/core';
import { Flex, Box } from '@hivekit/layout';
import { Badge } from '@hivekit/badge';
import { InlineEdit } from '@hivekit/inline-edit';
import { FormItem } from '@hivekit/form';
import { TextInput } from '@hivekit/text-input';
import { TextArea } from '@hivekit/text-area';
import { H2 } from '@hivekit/header';
import { ContentBox } from '@hivekit/content-box';
import { Text } from '@hivekit/text';

const HeaderBadge = ({
    fontSize,
    lineHeight,
    backgroundColor,
    color,
    children
}) => {
    const componentProps = {
        mt: 1,
        pl: '0px',
        pr: '0px',
        borderThickness: '0px',
        minWidth: '51px',
        fontSize,
        lineHeight,
        backgroundColor,
        color
    };

    return (
        <Badge {...componentProps}>
            {children}
        </Badge>
    );
};

HeaderBadge.propTypes = {
    fontSize: PropTypes.number,
    lineHeight: PropTypes.number,
    backgroundColor: PropTypes.string,
    color: PropTypes.string,
    children: PropTypes.node.isRequired
};

HeaderBadge.defaultProps = {
    fontSize: 0,
    lineHeight: fontSizes[2],
    backgroundColor: colors.statusYellow,
    color: colors.white
};

const HeaderIcon = ({
    name,
    size,
    color,
    mt
}) => {
    return React.createElement(name, {
        size,
        color,
        mt
    });
};

HeaderIcon.propTypes = {
    /**
     * Component name of the header icon
     */
    name: PropTypes.func.isRequired,
    /**
     * The size of the icon
     */
    size: PropTypes.number,
    /**
     * Color of the icon
     */
    color: PropTypes.string,
    /**
     * Margin top
     */
    mt: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.array])
};

HeaderIcon.defaultProps = {
    size: 1,
    color: colors.actionBlueDark,
    mt: '0px'
};

const TitleView = ({ value }) => {
    return (
        <H2>
            {value}
        </H2>
    );
};

TitleView.propTypes = {
    /**
     * Title Value
     */
    value: PropTypes.string
};

const DescriptionView = ({
    value,
    expandable,
    maxDisplayLines
}) => {
    const contentBoxConfiguration = {
        width: '100%',
        mt: 1,
        size: 0,
        expandable,
        maxDisplayLines
    };

    const textConfiguration = {
        color: colors.grayDark,
        size: 0,
        lineHeight: fontSizes[2]
    };

    return (
        <ContentBox {...contentBoxConfiguration}>
            <Text {...textConfiguration}>
                {value}
            </Text>
        </ContentBox>
    );
};

DescriptionView.propTypes = {
    /**
     * Description value
     */
    value: PropTypes.string,
    /**
     * Flag that indicates if the field is expandable or not
     */
    expandable: PropTypes.bool,
    /**
     * Sets the maximum number of lines to display before the field should be expandable
     */
    maxDisplayLines: PropTypes.number
};

DescriptionView.defaultProps = {
    expandable: true,
    maxDisplayLines: 3
};

const HeaderInlineEdit = ({ configuration, name }) => {
    const component = (reduxProps) => {
        const {
            input: { value, onChange }
        } = reduxProps;

        const componentProps = {
            ...configuration,
            text: value,
            onUpdate: onChange
        };

        return (
            <InlineEdit {...componentProps} />
        );
    };

    component.propTypes = {
        input: PropTypes.object.isRequired
    };

    return (
        <Field name={name} component={component} />
    );
};

HeaderInlineEdit.propTypes = {
    /**
     * Name of the form field (as it will appear in the redux-form data store)
     */
    name: PropTypes.string.isRequired,
    /**
     * Additional style configurations for the header instance
     */
    configuration: PropTypes.object
};

const TitleInlineEdit = ({ name }) => {
    const headerConfiguration = {
        size: 4,
        header: true,
        placeholder: 'Enter a name'
    };

    return (
        <HeaderInlineEdit name={name} configuration={headerConfiguration}/>
    );
};

TitleInlineEdit.propTypes = {
    /**
     * Name of the title form field (as it will appear in the redux-form data store)
     */
    name: PropTypes.string.isRequired
};

const DescriptionInlineEdit = ({ name }) => {
    const headerConfiguration = {
        color: colors.grayDark,
        type: 'textArea',
        size: 0,
        placeholder: 'Enter a description'
    };

    return (
        <HeaderInlineEdit name={name} configuration={headerConfiguration}/>
    );
};

DescriptionInlineEdit.propTypes = {
    /**
     * Name of the description form field (as it will appear in the redux-form data store)
     */
    name: PropTypes.string.isRequired
};

const TitleFormField = ({ name, validate }) => {
    const component = (reduxProps) => {
        const {
            input,
            meta: { touched, error }
        } = reduxProps;

        return (
            <FormItem error={touched && error ? error : ''} required={true} mb='0px'>
                <TextInput
                    {...input}
                    placeholder='Enter a name'
                />
            </FormItem>
        );
    };

    component.propTypes = {
        input: PropTypes.object.isRequired,
        meta: PropTypes.object.isRequired
    };

    return (
        <Field name={name} validate={validate} component={component} />
    );
};

TitleFormField.propTypes = {
    /**
     * Name of the title form field (as it will appear in the redux-form data store)
     */
    name: PropTypes.string.isRequired,
    /**
     * An array of validation functions to be run when accepting user input
     */
    validate: PropTypes.array
};

TitleFormField.defaultProps = {
    validate: []
};

const DescriptionFormField = ({ name, validate }) => {
    const component = (reduxProps) => {
        const {
            input,
            meta: { touched, error }
        } = reduxProps;

        return (
            <FormItem error={touched && error ? error : ''} mt={2} mb='0px'>
                <TextArea
                    {...input}
                    width='100%'
                    placeholder='Enter a description'
                />
            </FormItem>
        );
    };

    component.propTypes = {
        input: PropTypes.object.isRequired,
        meta: PropTypes.object.isRequired
    };

    return (
        <Field name={name} validate={validate} component={component} />
    );
};

DescriptionFormField.propTypes = {
    /**
     * Name of the description form field (as it will appear in the redux-form data store)
     */
    name: PropTypes.string.isRequired,
    /**
     * An array of validation functions to be run when accepting user input
     */
    validate: PropTypes.array
};

DescriptionFormField.defaultProps = {
    validate: []
};

const PlanePreviewHeader = ({
    iconSectionWidth,
    iconSectionComponent,
    iconComponent,
    badgeComponent,
    contentSectionWidth,
    contentSectionComponent,
    titleComponent,
    descriptionComponent,
    hasBorderBottom
}) => {
    const renderIconComponent = () => {
        const iconSection = iconSectionComponent || (
            <Flex
                alignItems='flex-start'
                flexDirection='column'
                justifyContent='center'
                width='100%'>
                <Box>
                    {iconComponent}
                </Box>
                {badgeComponent && (
                    <Box pl='3px'>
                        {badgeComponent}
                    </Box>
                )}
            </Flex>
        );

        return (
            <Box
                width={iconSectionWidth}
                pr='0px'
                pt='0px'>
                {iconSection}
            </Box>
        );
    };

    const renderContent = () => {
        const contentSection = contentSectionComponent || (
            <Fragment>
                {titleComponent}
                {descriptionComponent}
            </Fragment>
        );

        return (
            <Box
                width={contentSectionWidth}
                pl={2}
                align='center'>
                {contentSection}
            </Box>
        );
    };

    const headerConfiguration = {
        width: '100%',
        pb: 2
    };

    // Some designs have a border at the bottom of the header, some do not.
    if (hasBorderBottom) {
        headerConfiguration.style = {
            borderBottom: `solid ${colors.grayLight} 1px`
        };
    }

    return (
        <div style={{ width: '100%' }}>
            <Flex {...headerConfiguration}>
                {renderIconComponent()}
                {renderContent()}
            </Flex>
        </div>
    );
};

PlanePreviewHeader.propTypes = {
    /**
     * Sets the width of the icon section
     */
    iconSectionWidth: PropTypes.string,
    /**
     * Provides a component for the icon section of the header (in place of specifying individual icon and badge
     * components)
     */
    iconSectionComponent: PropTypes.element,
    /**
     * Specifies an icon component for the icon section of the header
     */
    iconComponent: PropTypes.element,
    /**
     * Specifies a badge component for the icon section of the header
     */
    badgeComponent: PropTypes.element,
    /**
     * Sets the width of the icon section
     */
    contentSectionWidth: PropTypes.string,
    /**
     * Specifies a component for the content section of the header (in place of specifying individual title and
     * description component)
     */
    contentSectionComponent: PropTypes.element,
    /**
     * Specifies a title component for the content section of the header
     */
    titleComponent: PropTypes.element,
    /**
     * Specifies a descripton component for the content section of the header
     */
    descriptionComponent: PropTypes.element,
    /**
     * Togglable border bottom for the header
     */
    hasBorderBottom: PropTypes.bool
};

PlanePreviewHeader.defaultProps = {
    iconSectionWidth: '10%',
    contentSectionWidth: '90%'
};

export {
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
};
