/*
    example usage:

    import { Plane, PlaneFull } from '@hivekit/plane';
    import { PlaneFullPaddingWrapper } from 'tio-app/patterns';

    const content = (
       <PlaneFullPaddingWrapper>
          <div>foobar</div>
       </PlaneFullPaddingWrapper>
    );

    const fullContent = (
       <PlaneFull header={whatever} content={content} />
    );

    return (
       <Plane full={fullContent} />
    );
*/

import React from 'react';
import PropTypes from 'prop-types';
import { spacing } from '@hivekit/core';
import { Box } from '@hivekit/layout';

// Helper/config functions
const planeFullSpacing = (val) => {
    if (val) {
        return spacing[4];
    }

    return '0px';
};

// Helper components
const PlanePaddingWrapper = ({
    // Factory props
    spacingFunction,

    // Presentation/default props
    children,
    applyP,
    applyPx,
    applyPy
}) => {
    const boxProps = {
        children,
        p: spacingFunction(applyP),
        px: spacingFunction(applyPx),
        py: spacingFunction(applyPy)
    };

    return (
        <Box {...boxProps} />
    );
};

PlanePaddingWrapper.propTypes = {
    // Factory instance props
    spacingFunction: PropTypes.func.isRequired,

    // Presentation props
    children: PropTypes.node,
    applyP: PropTypes.bool,
    applyPx: PropTypes.bool,
    applyPy: PropTypes.bool
};

PlanePaddingWrapper.defaultProps = {
    spacingFunction: planeFullSpacing,
    applyP: true,
    applyPx: true,
    applyPy: true
};

// Factory
const wrapperFactory = (factoryProps) => {
    const PlaneContentWrapper = (presentationProps) => {
        return (
            <PlanePaddingWrapper {...factoryProps} {...presentationProps} />
        );
    };

    return PlaneContentWrapper;
};

// Factory instances
const PlaneFullPaddingWrapper = wrapperFactory();
// const PlanePreviewDetailsPaddingWrapper = wrapperFactory();

export {
    PlaneFullPaddingWrapper,
    PlaneFullPaddingWrapper as PlanePreviewDetailsPaddingWrapper
};
