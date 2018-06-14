import React from 'react';
import { mount } from 'enzyme';

import { NotFound } from '../src/presentations/not-found';

describe('Core Not Found view', () => {
    let wrapper = null;

    beforeEach(() => {
        wrapper = mount(<NotFound />);
    });

    it('Should render without error', () => {
        expect(wrapper.length).toEqual(1);
    });

    it('Should render a div', () => {
        expect(wrapper.find('div').length).toEqual(1);
    });

    it('Should inform the user a view was not found', () => {
        const message = 'Page Not Found';

        expect(wrapper.contains(message)).toEqual(true);
    });
});
