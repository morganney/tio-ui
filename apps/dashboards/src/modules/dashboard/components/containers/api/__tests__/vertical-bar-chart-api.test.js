import React from 'react';
import { shallow } from 'enzyme';
import { Popover } from '@hivekit/popover';
import { Flex, Box } from '@hivekit/layout';
import { Text } from '@hivekit/text';

import {
    getDataProp,
    getLegendComponentProp
} from '../vertical-bar-chart-api';

describe('Test vertical bar chart api', () => {
    describe('Test getDataProp func', () => {
        test('It will return a vertical bar chart config', () => {
            const viz = {
                data: {
                    cells: [
                        {
                            value: '10'
                        },
                        {
                            value: '100'
                        }
                    ],
                    xLabels: [
                        'foo',
                        'bar'
                    ]
                }
            };
            const result = getDataProp(viz);
            const expected = [
                {
                    color: '#D2403F',
                    count: '10',
                    label: 'foo'
                },
                {
                    color: '#CC3C22',
                    count: '100',
                    label: 'bar'
                }
            ];

            expect(result).toEqual(expected);
        });
    });

    describe('Test getLegendComponentProp func', () => {
        test('It will return the legend popover component', () => {
            const legendFunction = getLegendComponentProp();
            const column = {
                value: '10',
                label: 'foo',
                color: '#cc0000'
            };
            const result = shallow(legendFunction(column));
            const expected = shallow(
                <Popover
                    hover={true}>
                    <Flex
                        alignItems='center'
                        flexWrap='nowrap'>
                        <Box mr={2}><Text size={5} color='#cc0000'>10</Text></Box>
                        <Box><Text>foo</Text></Box>
                    </Flex>
                </Popover>
            );

            expect(result).toEqual(expected);
        });
    });
});
