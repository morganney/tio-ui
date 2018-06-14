/**
 * Example Usage:
 *
 * import { Patterns } from 'tio-common';
 * const { FormFooter, FormFooterItem, FormFooterItemActions } = Patterns.form;
 *
 * <FormFooter>
 *     <FormFooterItem>
 *         <Button
 *              kind='terinary'
 *              ml={2}
 *              onClick={handleBackBtn}>
 *              Back
 *         </Button>
 *     </FormFooterItem>
 *     <FormFooterItemActions
 *         onCancel={handleFormCancel}
 *         cancelLabel='Cancel'
 *         onAction={handleFormSubmission}
 *         actionLabel='Create'
 *         actionDisabled={false} />
 * </FormFooter>
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Flex, Box } from '@hivekit/layout';
import { Button } from '@hivekit/button';

/**
 * Creates the basic form footer wrapper
 */
const FormFooter = ({ children }) => {
    return (
        <Flex width={1}>
            {children}
        </Flex>
    );
};

FormFooter.propTypes = {
    /**
     * Form Footer Item nodes
     */
    children: PropTypes.node.isRequired
};

/**
 * Creates a custom form footer item wrapper
 */
const FormFooterItem = ({
    children,
    ...props
}) => {
    return (
        <Box {...props}>
            {children}
        </Box>
    );
};

FormFooterItem.propTypes = {
    /**
     * Form item contents (like custom action buttons, text, etc.)
     */
    children: PropTypes.node.isRequired
};

/**
 * Creates a form footer item wrapper with two commonly used buttons inside: a cancel button and an action button
 */
const FormFooterItemActions = ({
    onCancel,
    cancelLabel,
    onAction,
    actionLabel,
    actionDisabled
}) => {
    return (
        <Box ml='auto'>
            <Button
                mr={2}
                kind='tertiary'
                onClick={onCancel}>
                {cancelLabel}
            </Button>

            <Button
                mr={2}
                kind='primary'
                onClick={onAction}
                disabled={actionDisabled}>
                {actionLabel}
            </Button>
        </Box>
    );
};

FormFooterItemActions.propTypes = {
    /**
     * Function callback for cancel button clicks
     */
    onCancel: PropTypes.func.isRequired,
    /**
     * Label for the cancel button
     */
    cancelLabel: PropTypes.string,
    /**
     * Function callback for action button clicks
     */
    onAction: PropTypes.func.isRequired,
    /**
     * Label for the action button
     */
    actionLabel: PropTypes.string,
    /**
     * Sets the disabled state of the action button
     */
    actionDisabled: PropTypes.bool
};

FormFooterItemActions.defaultProps = {
    cancelLabel: 'Cancel',
    actionLabel: 'Save',
    actionDisabled: false
};

export {
    FormFooter,
    FormFooterItem,
    FormFooterItemActions
};
