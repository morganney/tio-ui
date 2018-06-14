import React from 'react';
import { mount } from 'enzyme';

import { Container } from '../src/presentations/container';

describe('Core Navigation view', () => {
    let wrapper = null;
    const active = true;

    const ChildComponent = () => {
        return (
            <div id='jestChild'>I am a test Component</div>
        );
    };

    beforeEach(() => {
        wrapper = mount(<Container active={active}><ChildComponent /></Container>);
    });

    it('Should render without error', () => {
        expect(wrapper.find('#tio-container').length).toEqual(1);
    });

    it('Should render its children', () => {
        expect(wrapper.find('#jestChild').length).toEqual(1);
    });
});
