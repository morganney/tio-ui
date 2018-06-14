import {
    getDataProp,
    getLegendItemsProp
} from '../pie-chart-api';

describe('Test pie chart api', () => {
    describe('Test getDataProp func', () => {
        test('It will return a pie chart config', () => {
            const viz = {
                data: {
                    values: [
                        {
                            label: 'foo',
                            value: 0
                        },
                        {
                            label: 'bar',
                            value: 1
                        }
                    ]
                }
            };
            const result = getDataProp(viz);
            const expected = [
                {
                    name: 'foo',
                    color: '#2AA3F5',
                    x: 0,
                    y: 0
                },
                {
                    name: 'bar',
                    color: '#3FB4C1',
                    x: 1,
                    y: 1
                }
            ];

            expect(result).toEqual(expected);
        });
    });

    describe('Test getLegendItemsProp func', () => {
        test('It will return the param', () => {
            const mappedData = [
                {
                    name: 'foo',
                    color: '#2AA3F5',
                    x: 0,
                    y: 0
                },
                {
                    name: 'bar',
                    color: '#3FB4C1',
                    x: 1,
                    y: 1
                }
            ];
            const result = getLegendItemsProp(mappedData);
            const expected = [
                {
                    value: '0%',
                    description: 'foo',
                    color: '#2AA3F5'
                },
                {
                    value: '100%',
                    description: 'bar',
                    color: '#3FB4C1'
                }
            ];

            expect(result).toEqual(expected);
        });
    });
});
