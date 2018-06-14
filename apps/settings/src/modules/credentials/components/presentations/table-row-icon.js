import React from 'react';
import { colors } from '@hivekit/core';
import { CredentialIcon } from '@hivekit/icon';
import { Flex, Box } from '@hivekit/layout';

const TableRowIconView = () => {
    return (
        <Flex width='100%' height='100%' alignItems='center' justifyContent='center'>
            <Box>
                <CredentialIcon size={0} color={colors.actionBlueDark} pb={0} />
            </Box>
        </Flex>
    );
};

export {
    TableRowIconView
};
