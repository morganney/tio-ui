import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { colors } from '@hivekit/core';
import { Menu, MenuSection, MenuItem } from '@hivekit/global-nav';
import {
    VulnerabilitiesIcon,
    ExposureMapIcon,
    ContainerIcon,
    ScansIcon
} from '@hivekit/icon';

import { Utils } from 'tio-alloy';

const { white } = colors;

const NavigationView = ({
    apps,
    push,
    replace,
    history
}) => {
    const { active, inactive } = apps;

    // Event handlers
    const navigateToLegacyUrl = (path) => {
        const { location, location: { hostname } } = window;

        if (/container-security/.test(path)) {
            Utils.cookie.set('PLAY2AUTH_SESS_ID', Utils.storage.get('Iron.token'));

            return location.assign(path);
        }

        if (/localhost/.test(hostname)) {
            return location.assign(`/development.html#${path}`);
        }

        location.assign(`/app.html#${path}`);
    };
    const handleClickSettings = () => {
        const settings = active.settings || inactive.settings;

        // All users should have access to /settings/about in currentgen
        navigateToLegacyUrl(settings.legacy.home);
    };
    const handleOnClick = (menuItemInstance) => {
        const { home } = menuItemInstance;
        const { location: { pathname } } = history;
        const action = pathname !== home ? push : replace;

        action(home);
    };

    // Rendering helpers
    const renderMenuSectionSubItems = (app) => {
        const { navItems } = app.legacyActive ? app.legacy : app;

        if (!navItems) {
            return null;
        }

        return navItems.map((item, idx) => {
            const { location: { pathname } } = history;
            const getNormalizedPath = () => {
                const normalized = pathname.split('/').filter((segment) => {
                    return segment;
                }).splice(0, app.navItemsBasePathLength).join('/');

                return `/${normalized}`;
            };
            const testRegex = (regex, pass, fail) => {
                if (window.eval(regex).test(pathname)) {
                    return pass;
                }

                return fail;
            };
            const itemPathResolver = (path) => {
                const navItemIsLegacy = false;

                // path can be an object (including null), or string
                if (path && typeof path === 'object') {
                    const { regex, pass, fail, append, value, legacy } = path;

                    if (legacy) {
                        return {
                            path: value,
                            navItemIsLegacy: true
                        };
                    }

                    if (append) {
                        const normalizedPath = getNormalizedPath();

                        if (regex) {
                            const passPath = `${normalizedPath}${pass}`;

                            return {
                                navItemIsLegacy,
                                path: testRegex(regex, passPath, fail)
                            };
                        }

                        return {
                            navItemIsLegacy,
                            path: `${normalizedPath}${value}`
                        };
                    }

                    return {
                        navItemIsLegacy,
                        path: testRegex(regex, pass, fail)
                    };
                }

                return {
                    path,
                    navItemIsLegacy
                };
            };
            const { path, navItemIsLegacy } = itemPathResolver(item.path);
            let onClick = handleOnClick;

            if (app.legacyActive || navItemIsLegacy) {
                onClick = () => {
                    navigateToLegacyUrl(path);
                };
            } else if (!path) {
                onClick = () => {
                    alert('Not implemented.');
                };
            }

            return (
                <MenuItem
                    key={idx}
                    fontSize={1}
                    label={item.name}
                    home={path}
                    onClick={onClick}
                />
            );
        });
    };
    const renderMenuSection = (appId, Icon) => {
        const app = active[appId];
        let onClick = handleOnClick;

        if (!app || (app.licenseKey && !app.hasLicense)) {
            return null;
        }

        if (app.legacyActive) {
            onClick = () => {
                navigateToLegacyUrl(app.legacy.home);
            };
        }

        return (
            <MenuSection>
                <MenuItem
                    height='40px'
                    label={app.name}
                    home={app.home}
                    iconComponent={Icon ? <Icon color={white} /> : null}
                    onClick={onClick}
                />
                { renderMenuSectionSubItems(app) }
            </MenuSection>
        );
    };
    const menuProps = {
        onClickSettings: handleClickSettings,
        height: '100%',
        logoutURL: '/logout'
    };

    return (
        <Fragment>
            <Menu { ...menuProps }>
                { renderMenuSection('lumin', ExposureMapIcon) }
                { renderMenuSection('vulnerabilityManagement', VulnerabilitiesIcon) }
                { renderMenuSection('containerSecurity', ContainerIcon) }
                { renderMenuSection('webAppScanning', ScansIcon) }
            </Menu>
        </Fragment>
    );
};

NavigationView.propTypes = {
    apps: PropTypes.object.isRequired,
    push: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    replace: PropTypes.func.isRequired
};

export {
    NavigationView
};
