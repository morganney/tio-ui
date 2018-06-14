import { getMyDashboardsList } from '../my-dashboards-api';

describe('Test getMyDashboardsList func', () => {
    test('It will return expected data format', () => {
        const data = [
            {
                uuid: 123,
                name: 'foo'
            },
            {
                uuid: 456,
                name: 'bar'
            }
        ];
        const result = getMyDashboardsList(data);
        const expected = [
            {
                id: 123,
                label: 'foo',
                static: true,
                iconName: 'VulnerabilitiesIcon'
            },
            {
                id: 456,
                label: 'bar',
                static: true,
                iconName: 'VulnerabilitiesIcon'
            }
        ];

        expect(result).toEqual(expected);
    });
});
