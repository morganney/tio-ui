import { shallow } from 'enzyme';
import React from 'react';
import { Table } from '@hivekit/table';
import { PlaneFull } from '@hivekit/plane';
import { AdvancedSearch } from '@hivekit/advanced-search';

import { components as CredentialFormComponents } from '../../credential-form';
import * as components from '../components';

const { CredentialsView } = components.presentations;
const { DeleteCredentialButtonComponent, TableRowIconComponent } = components;
const { CredentialFormPlaneComponent } = CredentialFormComponents;

describe('Views', () => {
    describe('Credentials View Component', () => {
        const defaultProps = {
            fetchCredentials: jest.fn(),
            fetchCredentialsFilters: jest.fn(),
            setCredentialFormState: jest.fn(),
            credentials: {
                credentials: [],
                pagination: {
                    total: 100,
                    offset: 0,
                    limit: 50
                }
            },
            credentialsFetchOptions: {
                offset: 0,
                limit: 50,
                sorts: [
                    {
                        name: 'created_date',
                        order: 'desc'
                    }
                ],
                filters: [],
                search: ''
            },
            credentialsFetching: false,
            credentialsFilters: {
                filters: [],
                wildcardFields: [],
                sort: [],
                search_type: 'and'
            }
        };

        let wrapper = null;

        beforeEach(() => {
            wrapper = shallow(<CredentialsView {...defaultProps} />);
        });

        it('should render the Credentials view', () => {
            expect(wrapper.exists()).toEqual(true);
        });

        it('should render the PlaneFull component', () => {
            expect(wrapper.find(PlaneFull).exists()).toEqual(true);
        });

        it('should render the Table from hivekit with the proper Props', () => {
            const content = shallow(wrapper.props().content).find(Table);
            const tableProps = {
                allowSelection: false,
                columns: [
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
                ],
                rows: wrapper.instance().createRows(defaultProps.credentials.credentials),
                fetching: defaultProps.credentialsFetching,
                servicePagingAction: expect.any(Function),
                servicePagingResponse: defaultProps.credentials.pagination,
                onCellClicked: expect.any(Function),
                showPagination: true,
                loadingMessage: 'Processing...',
                noDataFoundMessage: 'No data was found',
                showPointerOnRowHover: true,
                defaultSortName: 'created_date',
                defaultSortOrder: 'desc'
            };

            expect(content.exists()).toEqual(true);
            expect(content.get(0)).toEqual(
                <Table
                    {...tableProps}
                />
            );
        });

        it('should render the AdvancedSearch component from hivekit with the proper Props', () => {
            const content = shallow(wrapper.props().content).find(AdvancedSearch);
            const props = {
                recordCount: `${defaultProps.credentials.pagination.total}`,
                labelKey: 'readable_name',
                legacy: true,
                valueKey: 'name',
                onSubmit: expect.any(Function),
                filterOptions: defaultProps.credentialsFilters.filters
            };

            expect(content.exists()).toEqual(true);
            expect(content.get(0)).toEqual(
                <AdvancedSearch
                    {...props}
                />
            );
        });

        it('should render the CredentialFormPlaneComponent component', () => {
            const content = shallow(wrapper.props().content).find(CredentialFormPlaneComponent);

            expect(content.exists()).toEqual(true);
        });
    });
});
