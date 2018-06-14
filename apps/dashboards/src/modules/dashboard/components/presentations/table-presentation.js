import React from 'react';
import PropTypes from 'prop-types';
import { Table } from '@hivekit/table';

const TableView = ({ rows, columns, fetchingVisualizationData, onCellClicked }) => {
    return (
        <Table
            rows={rows}
            columns={columns}
            // Messages
            // TODO: Need to hook this up to show an error message if needed
            // error=

            // States
            // TODO: This state only comes back as false after all visualizations are fetched and
            // TODO: it should probably be something that is tied to each separately
            fetching={fetchingVisualizationData}
            // Config
            inheritHeight={true}
            showPagination={false}
            allowSelection={false}
            onCellClicked={onCellClicked} />
    );
};

TableView.propTypes = {
    rows: PropTypes.array.isRequired,
    columns: PropTypes.array.isRequired,
    fetchingVisualizationData: PropTypes.bool.isRequired,
    onCellClicked: PropTypes.func.isRequired
};

export {
    TableView
};
