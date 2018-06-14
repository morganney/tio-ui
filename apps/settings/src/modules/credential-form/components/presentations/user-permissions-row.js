import React from 'react';
import PropTypes from 'prop-types';
import { spacing, colors } from '@hivekit/core';
import { UserIcon } from '@hivekit/icon';
import { Text } from '@hivekit/text';
import { Select } from '@hivekit/select';
import { Flex, Box } from '@hivekit/layout';

const UserPermissionsRowView = (props) => {
    const {
        name
    } = props;

    const renderPermission = () => {
        const {
            isCreator,
            permission
        } = props;

        const permissionOptions = [{
            value: 0,
            label: 'No Access'
        }, {
            value: 32,
            label: 'Can Use'
        }, {
            value: 64,
            label: 'Can Edit'
        }];

        if (isCreator) {
            return (
                <Text display='inline-block' size={1} color={colors.gray} textAlign='center'>Creator</Text>
            );
        }

        const handleSelectChange = () => {
            // TODO implement handle change
        };

        return (
            <Select
                placeholder='Permissions'
                value={permission}
                options={permissionOptions}
                onChange={handleSelectChange}
            />
        );
    };

    return (
        <Flex justifyContent='space-between' flexWrap='nowrap' width='100%' alignItems='center' mb={spacing[2]}>
            <Box pr={spacing[0]}>
                <Flex flexWrap='nowrap' alignItems='center'>
                    <Box>
                        <UserIcon size={1} mr={1} />
                    </Box>
                    <Box>
                        <Text display='inline-block' width='190px' size={1} truncate>
                            {name}
                        </Text>
                    </Box>
                </Flex>
            </Box>
            <Box width='110px'>
                {renderPermission()}
            </Box>
        </Flex>
    );
};

export {
    UserPermissionsRowView
};

UserPermissionsRowView.propTypes = {
    // Data Fields
    name: PropTypes.string.isRequired,
    isCreator: PropTypes.bool,
    permission: PropTypes.number
};
