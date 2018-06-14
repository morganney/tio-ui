import React from 'react';
import PropTypes from 'prop-types';
import { colors, spacing } from '@hivekit/core';
import { Flex, Box } from '@hivekit/layout';
import { InlineEdit } from '@hivekit/inline-edit';

import { DashboardDefaultComponent } from '../';

const DashboardSettingsHeaderView = ({
    dashboardData,
    dashboardCopied,
    onTitleUpdate
}) => {
    const onDescriptionUpdate = () => {
        alert('Update description');
    };

    return (
        <Flex
            width='100%'
            pb={spacing[2]}>
            <Box
                width='20%'
                pr='0px'
                pt='0px'>
                <Flex
                    alignItems='flex-start'
                    flexDirection='column'
                    justifyContent='center'
                    width='100%'>
                    <Box>
                        <DashboardDefaultComponent
                            baseIconColor={colors.actionBlueDarker}
                            iconSize={2} />
                    </Box>
                </Flex>
            </Box>
            <Box
                width='80%'
                pt='0px'>
                <InlineEdit
                    size={4}
                    header={true}
                    onUpdate={onTitleUpdate}
                    text={dashboardData.name}
                    editMode={dashboardCopied} />
                <InlineEdit
                    color={colors.grayDark}
                    type='textArea'
                    size={0}
                    onUpdate={onDescriptionUpdate}
                    text={dashboardData.description}>
                </InlineEdit>
            </Box>
        </Flex>
    );
};

DashboardSettingsHeaderView.propTypes = {
    dashboardData: PropTypes.object.isRequired,
    onTitleUpdate: PropTypes.func.isRequired,
    dashboardCopied: PropTypes.bool.isRequired
};

export {
    DashboardSettingsHeaderView
};
