import React from 'react';
import { shallow } from 'enzyme';

import { ScheduleView } from '../components/presentations/schedule';

describe('Common ScheduleView', () => {
    const timezones = ['US/Pacific', 'UTC'].map((zone) => {
        return { label: zone, value: zone };
    });
    let wrapper = null;

    beforeEach(() => {
        wrapper = shallow(<ScheduleView timezones={timezones} config={{}} />);
    });

    it('Should render without error', () => {
        expect(wrapper.length).toEqual(1);
    });
});
