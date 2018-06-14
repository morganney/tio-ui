import { shallow } from 'enzyme';
import React from 'react';

import * as components from '../components';

const { CredentialsPlaneView } = components.presentations;

describe('Settings - Credentials Module Components - Credentials Plane', () => {
    const defaultProps = {
        match: {
            path: '/settings'
        },
        history: {
            location: {
                pathname: '/settings/credentials'
            }
        }
    };

    it('should render a plane', () => {
        const component = shallow(<CredentialsPlaneView {...defaultProps} />);
        const plane = component.find('Plane');

        expect(plane.exists()).toBe(true);
        expect(plane.props()).toMatchObject({
            onChange: expect.any(Function),
            display: 'full',
            baseView: true,
            full: expect.any(Function)
        });
    });

    it('should render the plane closed, if the current location does not belong to credentials', () => {
        const props = {
            ...defaultProps,
            history: {
                location: {
                    pathname: '/settings'
                }
            }
        };
        const component = shallow(<CredentialsPlaneView {...props} />);
        const plane = component.find('Plane');

        expect(plane.exists()).toBe(true);
        expect(plane.props()).toMatchObject({
            onChange: expect.any(Function),
            display: 'closed',
            baseView: false,
            full: expect.any(Function)
        });
    });

    it('should render a route to the credentials content inside the plane', () => {
        const component = shallow(<CredentialsPlaneView {...defaultProps} />);
        const plane = component.find('Plane');
        const planeContent = plane.prop('full')();

        expect(planeContent.props.path).toEqual('/settings/credentials');
        expect(planeContent.props.component.WrappedComponent.name).toEqual('CredentialsLifeCycles');
    });
});
