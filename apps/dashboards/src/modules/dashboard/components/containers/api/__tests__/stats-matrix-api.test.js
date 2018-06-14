import { colors } from '@hivekit/core';

import {
    getHeadingsProp,
    getDataProp,
    getLabelsProp,
    getDefinitionsProp
} from '../stats-matrix-api';

const viz = {
    data: {
        xLabels: [
            'Vulnerabilities',
            'Severity: Critical',
            'Severity: High'
        ],
        cells: [
            {
                'cellType': 'textCount',
                'fgColor': '38,55,70',
                'bgColor': '255,255,255',
                'value': '14716'
            }, {
                'cellType': 'textCount',
                'fgColor': '212,63,58',
                'bgColor': '255,255,255',
                'value': '1208'
            }, {
                'cellType': 'textCount',
                'fgColor': '238,147,54',
                'bgColor': '255,255,255',
                'value': '7237000'
            }
        ]
    },
    definition: {
        cells: [
            {
                dataSource: {
                    query: {
                        filters: [
                            {
                                filterName: 'severity',
                                operator: '=',
                                value: '4,3,2,1'
                            }
                        ]
                    }
                }
            },
            {
                dataSource: {
                    query: {
                        filters: [
                            {
                                filterName: 'severity',
                                operator: '=',
                                value: '4'
                            }
                        ]
                    }
                }
            },
            {
                dataSource: {
                    query: {
                        filters: [
                            {
                                filterName: 'severity',
                                operator: '=',
                                value: '3'
                            }
                        ]
                    }
                }
            }
        ]
    }
};

describe('Test stats matrix api', () => {
    describe('Test getHeadingsProp func', () => {
        test('It will return the param', () => {
            const result = getHeadingsProp(viz);
            const expected = ['Vulnerabilities', 'Severity'];

            expect(result).toEqual(expected);
        });
    });

    describe('Test getDataProp func', () => {
        test('It will return a stats matrix config', () => {
            const result = getDataProp(viz);
            const expected = [
                {
                    value: '15',
                    color: colors.matrixItemText,
                    abbreviation: 'K'
                }, {
                    value: '1.2',
                    color: colors.statusRed,
                    abbreviation: 'K'
                }, {
                    value: '7.2',
                    color: colors.statusOrange,
                    abbreviation: 'M'
                }
            ];

            expect(result).toEqual(expected);
        });
    });

    describe('Test getLabelsProp func', () => {
        test('It will return a stats matrix labels array', () => {
            const result = getLabelsProp(viz);
            const expected = ['Critical', 'High'];

            expect(result).toEqual(expected);
        });
    });

    describe('Test getDefinitionsProp func', () => {
        test('It will return a stats matrix definitions array', () => {
            const result = getDefinitionsProp(viz);
            const expected = [
                {
                    filters: [
                        {
                            filterName: 'severity',
                            operator: '=',
                            value: '4,3,2,1'
                        }
                    ]
                }, {
                    filters: [
                        {
                            filterName: 'severity',
                            operator: '=',
                            value: '4'
                        }
                    ]
                }, {
                    filters: [
                        {
                            filterName: 'severity',
                            operator: '=',
                            value: '3'
                        }
                    ]
                }
            ];

            expect(result).toEqual(expected);
        });
    });
});
