import React from 'react';
import { shallow } from 'enzyme';
import { StackedBarChart } from '@hivekit/bar-chart';
import { Cell } from '@hivekit/table';
import { Text } from '@hivekit/text';
import { colors } from '@hivekit/core';

import {
    getSeverityDataProp,
    barGraphRenderer,
    textRenderer,
    severityRenderer,
    getRowsProp,
    getColumnsProp
} from '../table-api';

describe('Test table api', () => {
    describe('Test getSeverityDataProp func', () => {
        test('It will return formatted severity data', () => {
            const data = {
                value: {
                    data: {
                        Severity: 1
                    }
                }
            };
            const result = getSeverityDataProp(data);
            const expected = [
                {
                    count: 1,
                    label: 'Severity',
                    severity: 'severity'
                }
            ];

            expect(result).toEqual(expected);
        });
    });

    describe('Test barGraphRenderer func', () => {
        test('It will return a bar graph', () => {
            const data = {
                value: {
                    data: {
                        Severity: 1
                    }
                }
            };
            const prop = [
                {
                    count: 1,
                    label: 'Severity',
                    severity: 'severity'
                }
            ];
            const result = shallow(barGraphRenderer(data));
            const expected = shallow(
                <Cell>
                    <StackedBarChart
                        showLabels={false}
                        data={prop} />
                </Cell>
            );

            expect(result).toEqual(expected);
        });
    });

    describe('Test severityRenderer func', () => {
        test('It will return a cell component w/text node', () => {
            const data = {
                value: 'Info'
            };
            const result = shallow(severityRenderer(data));
            const expected = shallow(
                <Cell><Text color={colors.actionBlueDark}>Info</Text></Cell>
            );

            expect(result).toEqual(expected);
        });
    });

    describe('Test textRenderer func', () => {
        test('It will return a cell component w/param value', () => {
            const data = {
                value: 'foo'
            };
            const result = shallow(textRenderer(data));
            const expected = shallow(
                <Cell>foo</Cell>
            );

            expect(result).toEqual(expected);
        });

        test('It will return a cell component w/default value', () => {
            const data = {};
            const result = shallow(textRenderer(data));
            const expected = shallow(
                <Cell>N/A</Cell>
            );

            expect(result).toEqual(expected);
        });
    });

    describe('Test getRowsProp func', () => {
        test('It will not return table rows if param is in wrong format', () => {
            const viz = {
                data: 'foo'
            };
            const result = Boolean(getRowsProp(viz));
            const expected = false;

            expect(result).toEqual(expected);
        });

        test('It will return table rows if param is in proper format', () => {
            const viz = {
                data: {
                    data: [
                        {
                            data: ['foo', 'bar'],
                            label: 'fooLabel'
                        },
                        {
                            data: ['foo2', 'bar2'],
                            label: 'fooLabel2'
                        }
                    ]
                }
            };
            const result = getRowsProp(viz);
            const expected = [
                {
                    fooLabel: 'foo',
                    fooLabel2: 'foo2',
                    id: 0
                },
                {
                    fooLabel: 'bar',
                    fooLabel2: 'bar2',
                    id: 1
                }
            ];

            expect(result).toEqual(expected);
        });
    });

    describe('Test getColumnsProp func', () => {
        test('It will not return table columns if param is in wrong format', () => {
            const viz = {
                data: 'foo'
            };
            const result = Boolean(getColumnsProp(viz));
            const expected = false;

            expect(result).toEqual(expected);
        });

        test('It will return table columns if param is in proper format', () => {
            const viz = {
                data: {
                    data: [
                        {
                            label: 'foo'
                        },
                        {
                            label: 'bar'
                        }
                    ]
                }
            };
            const result = getColumnsProp(viz, 'foo', 'bar');
            const expected = [
                {
                    customCellRenderer: 'foo',
                    field: 'foo',
                    headerName: 'foo'
                },
                {
                    customCellRenderer: 'foo',
                    field: 'bar',
                    headerName: 'bar'
                }
            ];

            expect(result).toEqual(expected);
        });

        test('It will return table columns with bar chart', () => {
            const viz = {
                data: {
                    data: [
                        {
                            label: 'foo'
                        },
                        {
                            label: 'Vulnerabilities',
                            data: [
                                {
                                    type: 'vulnBar'
                                }
                            ]
                        }
                    ]
                }
            };
            const result = getColumnsProp(viz, 'foo', 'bar');
            const expected = [
                {
                    customCellRenderer: 'foo',
                    field: 'foo',
                    headerName: 'foo'
                },
                {
                    customCellRenderer: 'bar',
                    field: 'Vulnerabilities',
                    headerName: 'Vulnerabilities'
                }
            ];

            expect(result).toEqual(expected);
        });
    });
});
