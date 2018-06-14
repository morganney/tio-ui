import {
    getRowsProp,
    getColumnHeadersProp,
    getRowHeadersProp,
    getCellDataProp,
    getRatioCellLabel
} from '../matrix-api';

describe('Test matrix api', () => {
    describe('Test getRowsProp func', () => {
        const viz = {
            definition: {
                cells: [
                    {
                        definition: 'foo',
                        cellValue: {
                            value: 'bar'
                        },
                        dataSource: {
                            query: {
                                filters: ['foo', 'bar']
                            }
                        }
                    }
                ],
                rows: 3,
                cols: 2
            },
            data: {
                cells: [
                    {
                        cellIndex: 0,
                        definition: 'foo',
                        label: 'bar',
                        fgColor: '238,147,54',
                        bgColor: '255,255,255'
                    }
                ]
            }
        };

        test('It will return the correct number of rows', () => {
            const result = getRowsProp(viz);
            const expected = 3;
            expect(result.length).toEqual(expected);
        });

        test('Each row is an array', () => {
            const result = getRowsProp(viz);
            const expected = true;

            expect(Array.isArray(result[0])).toEqual(expected);
        });
    });

    describe('Test getColumnHeadersProp func', () => {
        test('It will return xLabels property', () => {
            const viz = {
                data: {
                    xLabels: 'foo'
                }
            };
            const result = getColumnHeadersProp(viz);
            const expected = 'foo';

            expect(result).toEqual(expected);
        });
    });

    describe('Test getRowHeadersProp func', () => {
        test('It will return yLabels property', () => {
            const viz = {
                data: {
                    yLabels: 'foo'
                }
            };
            const result = getRowHeadersProp(viz);
            const expected = 'foo';

            expect(result).toEqual(expected);
        });
    });

    describe('Test getCellDataProp func', () => {
        test('It will return the label property', () => {
            const cellData = {
                cell: {
                    label: 'foo'
                }
            };
            const result = getCellDataProp(cellData);
            const expected = 'foo';

            expect(result.label).toEqual(expected);
        });
    });

    describe('Test getRatioCellLabel func', () => {
        test('It will return the label property', () => {
            const cellData = '4:20';
            const result = getRatioCellLabel(cellData);
            const expected = '20%';

            expect(result).toEqual(expected);
        });
    });
});
