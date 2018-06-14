import React from 'react';
import PropTypes from 'prop-types';
import { colors } from '@hivekit/core';
import { Container } from '@hivekit/container';
import { RingChart } from '@hivekit/ring-chart';

const MatrixPieChartView = ({
    data,
    legendHeader,
    legendItems,
    descriptionHeader,
    descriptionDetail,
    popoverContent
}) => {
    return (
        <Container backgroundGradients={[colors.grayLight, 'transparent']} pt={2} pl={3}>
            <RingChart
                data={data}
                legendHeader={legendHeader}
                legendItems={legendItems}
                descriptionHeader={descriptionHeader}
                descriptionDetail={descriptionDetail}
                popoverContent={popoverContent} />
        </Container>
    );
};

MatrixPieChartView.propTypes = {
    data: PropTypes.array.isRequired,
    legendHeader: PropTypes.string.isRequired,
    legendItems: PropTypes.array.isRequired,
    descriptionHeader: PropTypes.string.isRequired,
    descriptionDetail: PropTypes.string.isRequired,
    popoverContent: PropTypes.func.isRequired
};

export {
    MatrixPieChartView
};
