import React from 'react';
import { mount } from 'enzyme';
import { MenuSection, MenuItem } from '@hivekit/global-nav';
import { MemoryRouter } from 'react-router-dom';

import { NavigationView as Navigation } from '../src/presentations/navigation';

describe('Core Navigation view', () => {
    let wrapper = null;
    const apps = {
        active: {
            containerSecurity: {
                name: 'Container Security',
                home: '/container-security/dashboard',
                licenseKey: 'consec',
                hasLicense: true,
                navItems: [
                    {
                        name: 'Images',
                        path: null
                    }
                ]
            },
            vulnerabilityManagement: {
                name: 'Vulnerability Management',
                home: '/dashboards/vulnerability-management',
                licenseKey: null,
                navItems: [
                    {
                        name: 'Assets',
                        path: '/vulnerability-management/assets'
                    },
                    {
                        name: 'Vulnerabilities',
                        path: '/vulnerability-management/vulnerabilities/plugins'
                    },
                    {
                        name: 'Scans',
                        path: null
                    }
                ]
            },
            webAppScanning: {
                name: 'Web App Scanning',
                home: null,
                licenseKey: 'was',
                hasLicense: false
            }
        },
        inactive: {
            lumin: {
                name: 'Lumin Beta',
                home: '/lumin/landing',
                licenseKey: null
            },
            tenableio: {
                name: 'Tenable.io',
                home: '/',
                licenseKey: null
            }
        }
    };

    beforeEach(() => {
        const props = {
            apps: apps,
            history: {
                location: {
                    pathname: '/dashboards/vulnerability-management'
                }
            }
        };

        wrapper = mount(<MemoryRouter><Navigation {...props} /></MemoryRouter>);
    });

    it('Should render without error', () => {
        expect(wrapper.length).toEqual(1);
    });

    it('Should render all menu sections for licensed and active apps', () => {
        const { active } = apps;
        let numberOfSections = 0;

        for (let key in active) {
            const app = active[key];

            if (!app.licenseKey || (app.licenseKey && app.hasLicense)) {
                numberOfSections++;
            }
        }

        expect(wrapper.find(MenuSection).length).toEqual(numberOfSections);
    });

    it('Should render all menu items for each menu section', () => {
        const { active } = apps;
        const sections = wrapper.find(MenuSection);
        let expectedMenuItemCount = 0
        let foundMenuItemCount = 0;

        for (let key in active) {
            const app = active[key];

            if (!app.licenseKey || (app.licenseKey && app.hasLicense)) {
                // All <MenuSection />'s have at least one <MenuItem />
                expectedMenuItemCount++;
            }

            if (Array.isArray(app.navItems)) {
                expectedMenuItemCount += app.navItems.length;
            }
        }

        sections.forEach((section) => {
            foundMenuItemCount += section.find(MenuItem).length;
        });

        expect(foundMenuItemCount).toEqual(expectedMenuItemCount);
    });

    it('The last menu item should be "Settings"', () => {
        const item = wrapper.find(MenuItem).last();

        expect(item.props().label).toEqual('Settings');
    });
});
