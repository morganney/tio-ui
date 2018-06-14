import {
    getDataProp,
    getTicksProp,
    getChartLegendProp
} from '../bar-chart-api';

describe('Test bar chart api', () => {
    describe('Test getDataProp func', () => {
        test('It will return a bar chart config', () => {
            const lintWorkaround = 2;
            const viz = {
                data: {
                    data: [
                        {
                            data: [1, lintWorkaround]
                        }
                    ]
                }

            };
            const result = getDataProp(viz);
            const expected = [1, lintWorkaround];

            expect(result).toEqual(expected);
        });
    });

    describe('Test getTicksProp func', () => {
        test('It will return a bar chart ticks array', () => {
            const viz = {
                data: {
                    labels: ['Label One', 'Label Two']
                }

            };
            const result = getTicksProp(viz);
            const expected = ['Label One', 'Label Two'];

            expect(result).toEqual(expected);
        });
    });

    describe('Test getChartLegendProp func', () => {
        test('It will return the param', () => {
            const result = getChartLegendProp();
            const expected = ['Asset Count'];

            expect(result).toEqual(expected);
        });
    });
});
