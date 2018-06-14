import React from 'react';
import { shallow } from 'enzyme';

import { Renderer } from '../src/renderer';

const match = {
    path: '/dashboards'
};

describe('Dashboards component', () => {
    describe('dashboard view', () => {
        it('should render without error', () => {
            const dashboardsApp = shallow(
                <Renderer match={match} />
            );

            expect(dashboardsApp.length).toEqual(1);
        });
    });
});
