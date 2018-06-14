import React from 'react';
import PropTypes from 'prop-types';
import { Flex } from '@hivekit/layout';

const Container = Flex.extend`
    align-self: stretch;
`;

const PageViewFullWrapper = ({ content }) => {
    const renderContentWrapper = () => {
        if (!content) {
            return null;
        }

        return (
            <Container>
                {content}
            </Container>
        );
    };

    return (
        <Flex flexDirection='column'>
            {renderContentWrapper()}
        </Flex>
    );
};

PageViewFullWrapper.propTypes = {
    /**
    * An element that is injected into the content area.
    */
    content: PropTypes.element
};

PageViewFullWrapper.defaultProps = {
    content: null
};

export {
    PageViewFullWrapper
};
