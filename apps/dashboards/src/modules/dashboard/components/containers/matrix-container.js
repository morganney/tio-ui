import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
    getRowsProp,
    getColumnHeadersProp,
    getRowHeadersProp
} from './api/matrix-api';

import { MatrixView } from '../presentations';

class Matrix extends Component {
    static propTypes = {
        // Data fields
        visualization: PropTypes.object.isRequired
    };

    render () {
        const { visualization } = this.props;
        const rows = getRowsProp(visualization);
        const columnHeaders = getColumnHeadersProp(visualization);
        const rowHeaders = getRowHeadersProp(visualization);

        return (
            <MatrixView
                rows={rows}
                columnHeaders={columnHeaders}
                rowHeaders={rowHeaders} />
        );
    }
}

export {
    Matrix as MatrixContainer
};
