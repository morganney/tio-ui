import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { AdvancedSearch } from '@hivekit/advanced-search';
import { Menu, MenuItem, MenuGroup } from '@hivekit/menu';
import { CredentialIcon } from '@hivekit/icon';

import { Patterns } from 'tio-common';

const {
    PlanePreviewHeader,
    HeaderIcon,
    TitleView
} = Patterns.plane;

const TypeFormView = (props) => {
    const filterCredentialsConfiguration = (configurationsList, search) => {
        let credentialTypesCount = 0;

        const filteredConfigurationsList = configurationsList.map((configuration) => {
            const filteredTypes = configuration.types.filter((type) => {
                const searchRegexp = new RegExp(search, 'i');

                if (type.name.match(searchRegexp)) {
                    credentialTypesCount++;

                    return true;
                }

                return false;
            });

            return { ...configuration, types: filteredTypes };
        });

        return {
            credentialTypesCount,
            filteredConfigurationsList
        };
    };

    const getMenuGroupItems = (configuration) => {
        const { match } = props;

        const menuItems = configuration.types.map(type => {
            const link = `${match.path}/${configuration.id}/${type.id}`;

            return <MenuItem to={link} key={type.name}>{type.name}</MenuItem>;
        });

        return (
            <MenuGroup title={configuration.category} key={configuration.category}>
                {menuItems}
            </MenuGroup>
        );
    };

    const createMenu = () => {
        const {
            configurationsList,
            search
        } = props;

        const {
            filteredConfigurationsList,
            credentialTypesCount
        } = filterCredentialsConfiguration(configurationsList, search);

        const menu = filteredConfigurationsList.reduce((menuComponents, configuration) => {
            if (!configuration.types.length) {
                return menuComponents;
            }

            return [
                ...menuComponents,
                getMenuGroupItems(configuration)
            ];
        }, []);

        return {
            credentialTypesCount,
            menu
        };
    };

    const handleSearchSubmit = (queryOptions) => {
        const { setSearch } = props;

        setSearch(queryOptions.search);
    };

    const { menu, credentialTypesCount } = createMenu();

    const headerStyles = {
        pb: 1
    };

    return (
        <Fragment>
            <PlanePreviewHeader
                headerStyles={headerStyles}
                iconSectionWidth='20%'
                contentSectionWidth='80%'
                iconComponent={<HeaderIcon name={CredentialIcon} size={3} />}
                titleComponent={<TitleView value='Select a Credential' />} />
            <AdvancedSearch
                searchBarOnly={true}
                onSubmit={handleSearchSubmit}
                recordCount={`${credentialTypesCount}`}
                recordLabel='Credentials'
                mb={3}
            />
            <Menu>
                {menu}
            </Menu>
        </Fragment>
    );
};

TypeFormView.propTypes = {
    // Data fields
    configurationsList: PropTypes.array.isRequired,
    search: PropTypes.string.isRequired,
    match: PropTypes.object.isRequired,

    // Dispatches
    fetchConfigurationsList: PropTypes.func.isRequired,
    setSearch: PropTypes.func.isRequired
};

export {
    TypeFormView
};
