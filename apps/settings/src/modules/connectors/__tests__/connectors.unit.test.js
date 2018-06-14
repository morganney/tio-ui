import { shallow } from 'enzyme';
import React from 'react';
import { ActionButton } from '@hivekit/button';
import { AdvancedSearch } from '@hivekit/advanced-search';
import { AwsElbIcon, AddIcon } from '@hivekit/icon';
import { colors } from '@hivekit/core';
import { Container } from '@hivekit/container';
import { Flex, Box } from '@hivekit/layout';
import { H2 } from '@hivekit/header';
import { PlaneFullLayout } from '@hivekit/plane';
import { Table } from '@hivekit/table';

import * as components from '../components';

const { ConnectorsView } = components.presentations;

describe('Views', () => {
    describe('Connectors View Component', () => {
        const defaultProps = {
            fetchConnectors: jest.fn(),
            connectors: {
                items: [],
                pagination: {}
            },
            connectorsFetching: false
        };

        let wrapper = null;

        beforeEach(() => {
            wrapper = shallow(<ConnectorsView {...defaultProps} />);
        });

        it('should render the Connectors view', () => {
            expect(wrapper.exists()).toEqual(true);
        });

        it('should render the PlaneFullLayout component', () => {
            expect(wrapper.find(PlaneFullLayout).exists()).toEqual(true);
        });

        it('should render the AdvancedSearch component from hivekit with the correct props', () => {
            const content = shallow(
                <div>
                    {wrapper.props().header}
                </div>
            ).find(Box);

            expect(content.exists()).toEqual(true);
            expect(content.get(0)).toEqual(
                <Box width='100%'>
                    <Container
                        borderRadius='0'
                        backgroundColor={colors.actionBlueDarker}>
                        <Flex
                            p={3}
                            flexDirection='column'
                            justifyContent='flex-end'
                            width='100%'
                            height='160px'>
                            <Box width='100%'>
                                <Flex
                                    flexWrap='nowrap'
                                    alignItems='center'
                                    width='100%'>
                                    <Box pr={2}>
                                        <AwsElbIcon
                                            size={1}
                                            color={colors.white} />
                                    </Box>
                                    <Box align='center'>
                                        <H2
                                            color={colors.white}
                                            truncate={true}>
                                            Connectors
                                        </H2>
                                    </Box>
                                    <Box pl={1}>
                                        <ActionButton
                                            kind='dark'
                                            mt={0}
                                            mr={2}>
                                            <AddIcon />
                                            New
                                        </ActionButton>
                                    </Box>
                                </Flex>
                            </Box>
                        </Flex>
                    </Container>
                </Box>
            );
        });

        it('should render the AdvancedSearch component from hivekit with the correct props', () => {
            const content = shallow(
                <div>
                    {wrapper.props().search}
                </div>
            ).find(AdvancedSearch);

            expect(content.exists()).toEqual(true);
            expect(content.get(0)).toEqual(<AdvancedSearch />);
        });

        it('should render the Table from hivekit with the correct props', () => {
            const content = shallow(
                <div>
                    {wrapper.props().content}
                </div>
            ).find(Table);

            const tableProps = {
                allowSelection: false,
                columns: [
                    { headerName: 'Name', field: 'name' },
                    { headerName: 'Type', field: 'type' },
                    { headerName: 'Status', field: 'status' },
                    { headerName: 'Date Created', field: 'date_created' },
                    { headerName: 'Last Connection', field: 'last_connection' },
                    { headerName: '', field: 'actions', suppressSorting: true }
                ],
                rows: defaultProps.connectors.items,
                fetching: defaultProps.connectorsFetching,
                servicePagingAction: defaultProps.fetchConnectors,
                servicePagingResponse: defaultProps.connectors.pagination
            };

            expect(content.exists()).toEqual(true);
            expect(content.get(0)).toMatchObject(<Table {...tableProps} />
            );
        });
    });
});
