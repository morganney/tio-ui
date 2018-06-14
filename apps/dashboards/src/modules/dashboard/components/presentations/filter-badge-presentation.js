import React from 'react';
import PropTypes from 'prop-types';
import { colors } from '@hivekit/core';
import { Badge } from '@hivekit/badge';
import { FilterIcon } from '@hivekit/icon';
import { Flex, Box } from '@hivekit/layout';
import { Text } from '@hivekit/text';

const FilterBadge = ({ widgetData, targetGroups }) => {
    const appliedFilter = Object.keys(widgetData.focusFilter)[0];
    const formatFocusFilter = () => {
        switch (appliedFilter) {
            case 'targetList':
                return 'Target Group';
            case 'hostAddress':
                return 'Custom';
        }
    };
    const getFilterValue = () => {
        const appliedTargetGroups = widgetData.focusFilter[appliedFilter];
        const appliedTargetGroupNames = [];

        for (let i = targetGroups.length; i--;) {
            const targetGroup = targetGroups[i];

            for (let j = appliedTargetGroups.length; j--;) {
                const appliedTargetGroup = appliedTargetGroups[j];

                if (appliedTargetGroup === targetGroup.id.toString()) {
                    appliedTargetGroupNames.push(targetGroup.name);
                }
            }
        }

        switch (appliedFilter) {
            case 'targetList':
                return appliedTargetGroupNames.sort().join(', ');
            case 'hostAddress':
                return widgetData.focusFilter[appliedFilter].replace(',', ', ');
        }
    };
    const baseTextProps = {
        color: colors.white,
        display: 'inline',
        size: 0
    };

    return (
        <Badge
            backgroundColor={colors.gray}
            borderThickness='0px'
            color={colors.white}
            height='22px'
            fontSize={0}
            lineHeight='22px'
            my={1}
            pl={0}
            pr={1}>
            <Flex>
                <Box mt='-2px'>
                    <FilterIcon
                        color={colors.white}
                        size={0} />
                </Box>
                <Box>
                    <Text
                        {...baseTextProps}
                        bold={true}
                        ml={0}>
                        {formatFocusFilter()}
                    </Text>
                    <Text {...baseTextProps} mx={1}>
                        -
                    </Text>
                    <Text {...baseTextProps}>
                        {getFilterValue()}
                    </Text>
                </Box>
            </Flex>
        </Badge>
    );
};

FilterBadge.propTypes = {
    widgetData: PropTypes.object.isRequired,
    targetGroups: PropTypes.array.isRequired
};

export {
    FilterBadge
};
