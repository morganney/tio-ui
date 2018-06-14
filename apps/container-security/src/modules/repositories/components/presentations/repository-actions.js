import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@hivekit/button';
import { CloseIcon, AwsRdsIcon } from '@hivekit/icon';
import { Box, Flex } from '@hivekit/layout';
import { Notification, NotificationActionBar, ShowNotification } from '@hivekit/notification';
import { Cell } from '@hivekit/table';

const RepositoryActionsView = (props) => {
    // Unpack the props
    const {
        // Redux props
        node,
        columnApi,

        // i18n messages
        titleText,
        messageText,
        cancelText,
        deleteText,

        // Redux Dispatches
        actionDeleteRepository
    } = props;

    // JSX Helpers
    const renderDeleteActionBar = (rowData) => {
        const repositoryName = rowData.name;
        const deleteRepository = () => {
            actionDeleteRepository(repositoryName);
        };

        return (
            <NotificationActionBar>
                <Button kind='tertiary'>
                    {cancelText}
                </Button>
                <Button kind='primary' onClick={deleteRepository}>
                    {deleteText}
                </Button>
            </NotificationActionBar>
        );
    };

    const promptForDelete = () => {
        const rowData = node.data;
        const icon = (
            <AwsRdsIcon />
        );

        ShowNotification(
            <Notification
                title={titleText}
                icon={icon}
                message={messageText}
                actions={renderDeleteActionBar(rowData)} />,
            {
                autoClose: false
            }
        );
    };

    const buttonContent = (
        <Button onClick={promptForDelete}>
            <CloseIcon />
        </Button>
    );

    // Returned JSX
    if (columnApi) {
        // Custom render when used with table
        return (
            <Cell {...props}>
                {buttonContent}
            </Cell>
        );
    }

    // Otherwise import from a non-table context
    return (
        <Flex>
            <Box m='0px'>
                {buttonContent}
            </Box>
        </Flex>
    );
};

RepositoryActionsView.propTypes = {
    // Redux propss
    node: PropTypes.object.isRequired,
    columnApi: PropTypes.object,

    // i18n messages
    titleText: PropTypes.string.isRequired,
    messageText: PropTypes.string.isRequired,
    cancelText: PropTypes.string.isRequired,
    deleteText: PropTypes.string.isRequired,

    // Redux Dispatches
    actionDeleteRepository: PropTypes.func.isRequired
};

export {
    RepositoryActionsView
};
