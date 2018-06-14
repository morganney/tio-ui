import React from 'react';
import PropTypes from 'prop-types';
import { Matrix } from '@hivekit/matrix';

const MatrixView = ({ rows, columnHeaders, rowHeaders }) => {
    return (
        <Matrix
            rows={rows}
            columnHeaders={columnHeaders}
            rowHeaders={rowHeaders} />
    );
};

MatrixView.propTypes = {
    rows: PropTypes.array.isRequired,
    columnHeaders: PropTypes.array,
    rowHeaders: PropTypes.array
};

export {
    MatrixView
};
