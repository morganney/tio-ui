import React from 'react';
import PropTypes from 'prop-types';
import { ActionButton } from '@hivekit/button';
import { AdvancedSearch } from '@hivekit/advanced-search';
import { AwsElbIcon, AddIcon } from '@hivekit/icon';
import { colors } from '@hivekit/core';
import { Container } from '@hivekit/container';
import { Flex, Box } from '@hivekit/layout';
import { H2 } from '@hivekit/header';
import { PlaneFullLayout } from '@hivekit/plane';
import { Table } from '@hivekit/table';

// TODO: Remove borderRadius from Container once bug is fixed
const renderHeader = () => {
    return (
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
};

const renderSearch = () => {
    return (
        <AdvancedSearch />
    );
};

const renderTable = ({
    connectors,
    connectorsFetching,
    fetchConnectors
}) => {
    const columnDefs = [
        { headerName: 'Name', field: 'name' },
        { headerName: 'Type', field: 'type' },
        { headerName: 'Status', field: 'status' },
        { headerName: 'Date Created', field: 'date_created' },
        { headerName: 'Last Connection', field: 'last_connection' },
        { headerName: '', field: 'actions', suppressSorting: true }
    ];

    return (
        <Table
            allowSelection={false}
            columns={columnDefs}
            fetching={connectorsFetching}
            rows={connectors.items}
            servicePagingAction={fetchConnectors}
            servicePagingResponse={connectors.pagination}
        />
    );
};

const ConnectorsView = (props) => {
    return (
        <PlaneFullLayout
            header={renderHeader()}
            search={renderSearch()}
            content={renderTable(props)}
        />
    );
};

renderTable.propTypes = {
    connectors: PropTypes.object.isRequired,
    connectorsFetching: PropTypes.bool.isRequired,
    fetchConnectors: PropTypes.func.isRequired
};

ConnectorsView.propTypes = {
    // Data fields
    connectors: PropTypes.object.isRequired,
    connectorsFetching: PropTypes.bool.isRequired,

    // Dispatchers
    fetchConnectors: PropTypes.func.isRequired
};

export {
    ConnectorsView
};
