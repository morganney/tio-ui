import React from 'react';
import PropTypes from 'prop-types';
import { Table } from '@hivekit/table';
import { ExposureMapIcon } from '@hivekit/icon';

const ImagesDetailDigestView = ({
    // Redux data fields
    layerDigest,

    // il8n
    digestColumnMessage
}) => {
    const digestColumns = [
        {
            headerName: digestColumnMessage,
            field: 'digest',
            suppressSorting: true
        }
    ];

    const getCheckboxIcon = () => {
        return (
            <ExposureMapIcon />
        );
    };

    // TODO re-introduce 'fetching' and 'error' when routing / single image fetching is introduced
    const digestTableProps = {
        allowSelection: true,
        rows: layerDigest,
        columns: digestColumns,
        checkboxIconComponent: getCheckboxIcon
    };

    // JSX
    return (
        <Table {...digestTableProps}/>
    );
};

ImagesDetailDigestView.propTypes = {
    // Redux data fields
    layerDigest: PropTypes.array.isRequired,

    // il8n
    digestColumnMessage: PropTypes.string.isRequired
};

export {
    ImagesDetailDigestView
};
