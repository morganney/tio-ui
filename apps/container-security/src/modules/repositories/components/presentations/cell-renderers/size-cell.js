import React from 'react';
import PropTypes from 'prop-types';
import { Cell } from '@hivekit/table';

import { constants as commonConstants } from 'tio-common';

const SizeCellView = (props) => {
    const { intl, value } = props;
    const sizeNum = parseInt(value, 10);
    const { byteToGibConversionRate } = commonConstants;

    return (
        <Cell {...props}>
            {intl.formatNumber(sizeNum * byteToGibConversionRate)}
        </Cell>
    );
};

SizeCellView.propTypes = {
    // HOC props
    intl: PropTypes.object.isRequired,

    // Ag-grid props I need
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired
};

export {
    SizeCellView
};
