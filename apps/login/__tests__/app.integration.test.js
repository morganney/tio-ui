import React from 'react';
import { mount, shallow } from 'enzyme';
import LoginApp from '../src/app';

describe('Login component', () => {
    describe('login view', () => {
        it('should render without error', () => {
            // let login = mount(<LoginApp />);
            let login = shallow(<LoginApp />);

            expect(login.length).toEqual(1);
        });
    });
});
