import { shallow } from 'enzyme';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Button } from '@hivekit/button';

import { Patterns } from 'tio-common';

import * as components from '../components';

const { TypeFormComponent, SettingsFormComponent } = components;
const { CredentialFormPlaneView } = components.presentations;
const { FormFooterItem, FormFooterItemActions } = Patterns.form;

describe('Settings - Credential Form Module Components - Credential Form Plane', () => {
    const defaultProps = {
        isCredentialFormView: true,
        crudAction: 'add',
        match: {
            path: '/settings/credentials'
        },
        history: {
            location: {
                pathname: '/settings/credentials/add'
            }
        }
    };

    it('should render the plane open, if the current location belongs to the credential form', () => {
        const component = shallow(<CredentialFormPlaneView {...defaultProps} />);
        const plane = component.find('Plane');

        expect(plane.exists()).toBe(true);
        expect(plane.props()).toMatchObject({
            onChange: expect.any(Function),
            display: 'partial',
            preview: expect.any(Function)
        });
    });

    it('should render the plane closed, if the current location does not belong to the credential form', () => {
        const props = {
            ...defaultProps,
            isCredentialFormView: false,
            history: {
                location: {
                    pathname: 'settings/credentials'
                }
            }
        };
        const component = shallow(<CredentialFormPlaneView {...props} />);
        const plane = component.find('Plane');

        expect(plane.exists()).toBe(true);
        expect(plane.props()).toMatchObject({
            onChange: expect.any(Function),
            display: 'closed',
            preview: expect.any(Function)
        });
    });

    it('should render routes to the Type Form and Settings Form in the preview content', () => {
        const component = shallow(<CredentialFormPlaneView {...defaultProps} />);
        const plane = component.find('Plane');
        const planePreview = shallow(
            <MemoryRouter>
                {plane.prop('preview')()}
            </MemoryRouter>
        );
        const routes = planePreview.find('Switch').children();

        expect(routes.at(0).props()).toMatchObject({
            path: '/settings/credentials/add',
            exact: true,
            component: TypeFormComponent
        });

        expect(routes.at(1).props()).toMatchObject({
            path: '/settings/credentials/add/:category/:type',
            exact: true,
            component: SettingsFormComponent
        });

        expect(routes.at(2).props()).toMatchObject({
            path: '/settings/credentials/edit/:uuid',
            exact: true,
            component: SettingsFormComponent
        });
    });

    it('should render control buttons in the footer', () => {
        const props = {
            ...defaultProps,
            history: {
                location: {
                    pathname: '/settings/credentials/add/Host/Windows'
                }
            },
            credentialCrudAction: {}
        };
        const component = shallow(<CredentialFormPlaneView {...props} />);
        const formFooter = shallow(component.find('Plane').prop('previewFooter')());
        const backBtn = formFooter.find('FormFooterItem');
        const actions = formFooter.find('FormFooterItemActions');

        expect(actions.exists()).toBe(true);
        expect(actions.get(0)).toMatchObject(
            <FormFooterItemActions
                onCancel={expect.any(Function)}
                cancelLabel='Cancel'
                onAction={expect.any(Function)}
                actionLabel='Create'
                actionDisabled={false} />
        );

        expect(backBtn.exists()).toBe(true);
        expect(backBtn.get(0)).toMatchObject(
            <FormFooterItem>
                <Button
                    kind='tertiary'
                    ml={2}
                    onClick={expect.any(Function)}>
                    Back
                </Button>
            </FormFooterItem>
        );
    });

    it('should change the action button label when editing a credential', () => {
        const props = {
            ...defaultProps,
            crudAction: 'edit',
            history: {
                location: {
                    pathname: '/settings/credentials/edit/1234'
                }
            },
            credentialCrudAction: {}
        };
        const component = shallow(<CredentialFormPlaneView {...props} />);
        const formFooter = shallow(component.find('Plane').prop('previewFooter')());
        const actions = formFooter.find('FormFooterItemActions');

        expect(actions.prop('actionLabel')).toEqual('Save');
    });

    it('should disable the action button when on the "Select Credential Type"', () => {
        const component = shallow(<CredentialFormPlaneView {...defaultProps} />);
        const formFooter = shallow(component.find('Plane').prop('previewFooter')());
        const actions = formFooter.find('FormFooterItemActions');

        expect(actions.prop('actionDisabled')).toEqual(true);
    });

    it('should disable the action button when running an credential crud action', () => {
        const props = {
            ...defaultProps,
            history: {
                location: {
                    pathname: '/settings/credentials/add/Host/Windows'
                }
            },
            credentialCrudAction: {
                running: true
            }
        };
        const component = shallow(<CredentialFormPlaneView {...props} />);
        const formFooter = shallow(component.find('Plane').prop('previewFooter')());
        const actions = formFooter.find('FormFooterItemActions');

        expect(actions.prop('actionDisabled')).toEqual(true);
    });
});
