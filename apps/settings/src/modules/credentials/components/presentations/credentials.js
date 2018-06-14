import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CredentialIcon, AddIcon } from '@hivekit/icon';
import { ActionButton } from '@hivekit/button';
import { PlaneFull, PlaneFullHeader } from '@hivekit/plane';
import { Table } from '@hivekit/table';
import { AdvancedSearch } from '@hivekit/advanced-search';
import { Flex, Box } from '@hivekit/layout';

import { Utils } from 'tio-alloy';

import {
    DeleteCredentialButtonComponent,
    TableRowIconComponent
} from './..';

import {
    components as credentialFormComponents
} from '../../../credential-form';

const { CredentialFormPlaneComponent, UserPermissionsPlaneComponent } = credentialFormComponents;

// I would prefer this to be a functional component if possible. When I tried to convert it it broke the tests and updating all that was out of scope for my efforts
class CredentialsView extends Component {
    static propTypes = {
        // Data fields
        credentials: PropTypes.object.isRequired,
        credentialsFetchOptions: PropTypes.object.isRequired,
        credentialsFetching: PropTypes.bool.isRequired,
        credentialsFilters: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired,
        match: PropTypes.object.isRequired,

        // Dispatchers
        fetchCredentials: PropTypes.func.isRequired,
        fetchCredentialsFilters: PropTypes.func.isRequired,
        setCredentialsFetchOptions: PropTypes.func.isRequired
    };

    constructor (props) {
        super(props);

        this.handleAddCredentialClick = this.handleAddCredentialClick.bind(this);
        this.handleFetching = this.handleFetching.bind(this);
        this.handleCredentialRowClick = this.handleCredentialRowClick.bind(this);
    }

    handleFetching (options) {
        const { setCredentialsFetchOptions, fetchCredentials } = this.props;

        setCredentialsFetchOptions(options);
        fetchCredentials();
    }

    handleAddCredentialClick () {
        const { history, match } = this.props;

        history.push(`${match.path}/add`);
    }

    handleCredentialRowClick (node) {
        const { history, match } = this.props;
        const {
            data: { uuid },
            colDef: { field }
        } = node;

        if (field === 'actions') {
            return;
        }

        history.push(`${match.path}/edit/${uuid}`);
    }

    createRows (credentials) {
        return credentials.map((credential) => {
            return {
                name: credential.name,
                type: credential.type.name,
                created_date: Utils.convertUnixTimeToDate(credential.created_date),
                created_by: credential.created_by.display_name,
                last_used_by: credential.last_used_by.display_name || 'Unused',
                uuid: credential.uuid
            };
        });
    }

    render () {
        const { credentials, credentialsFetchOptions, credentialsFetching, credentialsFilters } = this.props;

        const columnDefs = [
            {
                headerName: '',
                field: 'icon',
                width: 20,
                suppressSorting: true,
                customCellRenderer: TableRowIconComponent
            },
            { headerName: 'Name', field: 'name' },
            { headerName: 'Type', field: 'type' },
            { headerName: 'Created Date', field: 'created_date' },
            { headerName: 'Created By', field: 'created_by' },
            { headerName: 'Last Used By', field: 'last_used_by' },
            {
                headerName: '',
                field: 'actions',
                width: 32,
                suppressSorting: true,
                customCellRenderer: DeleteCredentialButtonComponent
            }
        ];

        const actions = [
            <ActionButton
                onClick={this.handleAddCredentialClick}
                kind='dark'
                key={0}
                mr={2}>
                <AddIcon />
                Add
            </ActionButton>
        ];

        const header = (
            <PlaneFullHeader
                title='Credentials'
                icon={<CredentialIcon />}
                actions={actions}/>
        );

        const content = (
            <div>
                <AdvancedSearch
                    recordCount={`${credentials.pagination.total}`}
                    labelKey='readable_name'
                    valueKey='name'
                    onSubmit={this.handleFetching}
                    filterOptions={credentialsFilters.filters}
                    legacy={true}
                />
                <Flex width='100%'>
                    <Box width='100%' px={4}>
                        <Table
                            allowSelection={false}
                            columns={columnDefs}
                            rows={this.createRows(credentials.credentials)}
                            fetching={credentialsFetching}
                            servicePagingAction={this.handleFetching}
                            servicePagingResponse={credentials.pagination}
                            onCellClicked={this.handleCredentialRowClick}
                            defaultSortName={credentialsFetchOptions.sorts[0].name}
                            defaultSortOrder={credentialsFetchOptions.sorts[0].order}
                        />
                    </Box>
                </Flex>
                <CredentialFormPlaneComponent />
                <UserPermissionsPlaneComponent />
            </div>
        );

        return (
            <PlaneFull
                header={header}
                content={content} />
        );
    }
}

export {
    CredentialsView
};
