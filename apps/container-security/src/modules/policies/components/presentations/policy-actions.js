import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@hivekit/button';
import { CloseIcon, PoliciesIcon } from '@hivekit/icon';
import { Box, Flex } from '@hivekit/layout';
import { Notification, NotificationActionBar, ShowNotification } from '@hivekit/notification';
import { Cell } from '@hivekit/table';

class PolicyActionsView extends Component {
    static propTypes = {
        // Redux props
        // node and columnApi come from ag-grid-react as props, since this component is used as a CustomCellRenderer
        // If used in other contexts (like edit policy drilldowns), node is expected to be provided.
        node: PropTypes.object.isRequired,
        columnApi: PropTypes.object,

        // i18n messages
        titleText: PropTypes.string.isRequired,
        messageText: PropTypes.string.isRequired,
        cancelText: PropTypes.string.isRequired,
        deleteText: PropTypes.string.isRequired,

        // Redux Dispatches
        actionDeletePolicy: PropTypes.func.isRequired
    }

    constructor () {
        super();

        this.promptForDelete = this.promptForDelete.bind(this);
    }

    promptForDelete () {
        const { node, titleText, messageText } = this.props;

        const rowData = node.data;
        const icon = (
            <PoliciesIcon />
        );

        ShowNotification(
            <Notification
                title={titleText}
                message={messageText}
                icon={icon}
                actions={this.renderDeleteActionBar(rowData)} />,
            {
                autoClose: false
            }
        );
    }

    renderDeleteActionBar (rowData) {
        const { actionDeletePolicy, cancelText, deleteText } = this.props;

        const policyId = rowData.id;
        const deletePolicy = () => {
            actionDeletePolicy(policyId);
        };

        return (
            <NotificationActionBar>
                <Button kind='tertiary'>
                    {cancelText}
                </Button>
                <Button kind='primary' onClick={deletePolicy}>
                    {deleteText}
                </Button>
            </NotificationActionBar>
        );
    }

    render () {
        const { columnApi } = this.props;
        const buttonContent = (
            <Button onClick={this.promptForDelete}>
                <CloseIcon />
            </Button>
        );

        if (columnApi) {
            // We're calling this as a custom cell renderer, if this is present on the props.
            // So wrap it in a <Cell>
            return (
                <Cell {...this.props}>
                    {buttonContent}
                </Cell>
            );
        }

        // Otherwise, we're importing this from a non-table context, like the actions bar on a plane preview.
        return (
            <Flex>
                <Box m='0px'>
                    {buttonContent}
                </Box>
            </Flex>
        );
    }
}

export {
    PolicyActionsView
};
