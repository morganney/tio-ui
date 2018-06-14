import { shallow } from 'enzyme';
import React from 'react';

import * as components from '../components';

const { ConnectorsPlaneView } = components.presentations;

describe('Settings - Connectors Module Components - Connectors Plane', () => {
    const defaultProps = {
        match: {
            path: '/settings/connectors'
        },
        history: {
            location: {
                pathname: '/settings/connectors'
            }
        }
    };

    it('should render a plane', () => {
        const component = shallow(<ConnectorsPlaneView {...defaultProps} />);
        const plane = component.find('Plane');

        expect(plane.exists()).toBe(true);
        expect(plane.props()).toMatchObject({
            onChange: expect.any(Function),
            display: 'full',
            baseView: true,
            full: expect.any(Function)
        });
    });

    it('should render the plane closed, if the current location does not belong to connectors', () => {
        const newProps = {
            ...defaultProps,
            history: {
                location: {
                    pathname: '/settings'
                }
            }
        };
        const component = shallow(<ConnectorsPlaneView {...newProps} />);
        const plane = component.find('Plane');

        expect(plane.exists()).toBe(true);
        expect(plane.props()).toMatchObject({
            onChange: expect.any(Function),
            display: 'closed',
            baseView: false,
            full: expect.any(Function)
        });
    });

    it('should render a route to the connectors content inside the plane', () => {
        const component = shallow(<ConnectorsPlaneView {...defaultProps} />);
        const plane = component.find('Plane');
        const planeContent = plane.prop('full')();

        expect(planeContent.props.path).toEqual('/settings/connectors');
    });
});
