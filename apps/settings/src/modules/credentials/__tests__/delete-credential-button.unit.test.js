import { shallow } from 'enzyme';
import React from 'react';
import { CloseIcon } from '@hivekit/icon';

import { DeleteCredentialButtonView } from '../components/presentations/delete-credential-button';

describe('Delete credential button view component', () => {
    let wrapper = null;

    beforeEach(() => {
        wrapper = shallow(<DeleteCredentialButtonView />);
    });

    it('Should render the component', () => {
        expect(wrapper.exists()).toEqual(true);
    });

    it('Should render the CloseIcon component', () => {
        expect(wrapper.find(CloseIcon).exists()).toEqual(true);
    });
});
