import React from 'react';
import PropTypes from 'prop-types';
import { colors } from '@hivekit/core';
import { Container } from '@hivekit/container';
import { RingChart } from '@hivekit/ring-chart';

const PieChartView = ({
    data,
    legendItems,
    descriptionHeader,
    descriptionDetail,
    onItemClickedHandler
}) => {
    return (
        <Container backgroundGradients={[colors.grayLight, 'transparent']} pt={2} pl={3}>
            <RingChart
                data={data}
                legendItems={legendItems}
                descriptionHeader={descriptionHeader}
                descriptionDetail={descriptionDetail}
                onClick={onItemClickedHandler} />
        </Container>
    );
};

PieChartView.propTypes = {
    data: PropTypes.array.isRequired,
    legendItems: PropTypes.array.isRequired,
    descriptionHeader: PropTypes.string,
    descriptionDetail: PropTypes.string,
    onItemClickedHandler: PropTypes.func.isRequired
};

export {
    PieChartView
};
