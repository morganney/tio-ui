import React from 'react';
import { shallow } from 'enzyme';
import { Flex, Box } from '@hivekit/layout';
import { Button } from '@hivekit/button';

import {
    FormFooter,
    FormFooterItem,
    FormFooterItemActions
} from '../form-footer';

describe('Tenable.io Patterns -- Form -- Form Footer', () => {
    it('should render a form footer', () => {
        const component = shallow(
            <FormFooter>
                Test
            </FormFooter>
        );

        expect(component.get(0)).toMatchObject(
            <Flex width={1}>
                Test
            </Flex>
        );
    });

    it('should render a form footer item', () => {
        const handleBackBtn = jest.fn();
        const component = shallow(
            <FormFooterItem mt={0}>
                <Button
                    kind='tertiary'
                    ml={2}
                    onClick={handleBackBtn}>
                    Back
                </Button>
            </FormFooterItem>
        );

        expect(component.get(0)).toMatchObject(
            <Box mt={0}>
                <Button
                    kind='tertiary'
                    ml={2}
                    onClick={handleBackBtn}>
                    Back
                </Button>
            </Box>
        );
    });

    it('should render the standard form footer item actions', () => {
        const handleFormCancel = jest.fn();
        const handleFormSubmission = jest.fn();
        const component = shallow(
            <FormFooterItemActions
                onCancel={handleFormCancel}
                cancelLabel='Cancel'
                onAction={handleFormSubmission}
                actionLabel='Create'
                actionDisabled={false} />
        );

        expect(component.get(0)).toMatchObject(
            <Box ml='auto'>
                <Button
                    mr={2}
                    kind='tertiary'
                    onClick={handleFormCancel}>
                    Cancel
                </Button>

                <Button
                    mr={2}
                    kind='primary'
                    onClick={handleFormSubmission}
                    disabled={false}>
                    Create
                </Button>
            </Box>
        );
    });
});
