import React from 'react';
import { shallow } from 'enzyme';
import { AdvancedSearch } from '@hivekit/advanced-search';
import { Menu } from '@hivekit/menu';

import { TypeFormView } from '../../credential-form/components/presentations/type-form';

describe('TypeFormView component', () => {
    let wrapper = null;

    beforeEach(() => {
        const defaultProps = {
            search: '',
            configurationsList: []
        };

        wrapper = shallow(<TypeFormView {...defaultProps} />);
    });

    it('Should render the TypeFormView component', () => {
        expect(wrapper.exists()).toEqual(true);
    });

    it('Should render an AdvancedSearch component', () => {
        expect(wrapper.find(AdvancedSearch).exists()).toEqual(true);
    });

    it('Should render a Menu component', () => {
        expect(wrapper.find(Menu).exists()).toEqual(true);
    });
});
