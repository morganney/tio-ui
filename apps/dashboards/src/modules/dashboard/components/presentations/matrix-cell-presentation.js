import React from 'react';
import PropTypes from 'prop-types';
import { MatrixCellItem } from '@hivekit/matrix';

const MatrixCellView = ({ value, color, background, backgroundHover, popover, onItemClickedHandler }) => {
    return (
        <MatrixCellItem
            value={value}
            color={color}
            background={background}
            backgroundHover={backgroundHover}
            popover={popover}
            onClick={onItemClickedHandler} />
    );
};

MatrixCellView.propTypes = {
    value: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    background: PropTypes.string.isRequired,
    backgroundHover: PropTypes.string,
    popover: PropTypes.object,
    onItemClickedHandler: PropTypes.func.isRequired
};

export {
    MatrixCellView
};
