import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { colors } from '@hivekit/core';
import { PlanePreviewItem } from '@hivekit/plane';
import { CredentialIcon, AddIcon } from '@hivekit/icon';
import { Form, FormSection } from '@hivekit/form';
import { ActionButton } from '@hivekit/button';
import { Container } from '@hivekit/container';

import { Patterns } from 'tio-common';

import { renderCredentialFormInputs, validationFn } from './form-utils';
import { UserPermissionsTableComponent } from './../';

const {
    PlanePreviewHeader,
    HeaderIcon,
    TitleInlineEdit,
    DescriptionInlineEdit,
    TitleFormField,
    DescriptionFormField
} = Patterns.plane;

const SettingsFormView = (props) => {
    const renderHeader = () => {
        const { crudAction } = props;

        const headerEdittable = (
            <PlanePreviewHeader
                hasBorderBottom={true}
                iconComponent={<HeaderIcon name={CredentialIcon} mt={0} />}
                titleComponent={<TitleInlineEdit name='name' />}
                descriptionComponent={<DescriptionInlineEdit name='description' />} />
        );

        const headerForm = (
            <PlanePreviewHeader
                hasBorderBottom={true}
                iconComponent={<HeaderIcon name={CredentialIcon} />}
                contentSectionComponent={
                    <Form>
                        <TitleFormField name='name' validate={[validationFn.required]} />
                        <DescriptionFormField name='description' />
                    </Form>
                }
            />
        );

        return crudAction === 'edit' ? headerEdittable : headerForm;
    };

    const renderBody = () => {
        const { configuration, change, clearFields, userName, setUserPermissionsPlaneState } = props;
        const reduxFormDispatches = { change, clearFields };

        const handleAddUserPermissionsClick = () => {
            setUserPermissionsPlaneState('partial');
        };

        const userPermissionActions = [
            <ActionButton
                onClick={handleAddUserPermissionsClick}
                key={0}
                mr={2}>
                <AddIcon />
                Add
            </ActionButton>
        ];

        const renderUserPermissionsSection = () => {
            // temporary conditional as it will be disabled for EA
            const enabledForEA = false;

            if (enabledForEA) {
                return (
                    <FormSection
                        title='User Permissions'
                        actions={userPermissionActions}>
                        <Container
                            pt={2}
                            borderColor={colors.grayLight}
                            borderBottomWidth='1px'
                            borderTopWidth='1px'>
                            <UserPermissionsTableComponent userName={userName} />
                        </Container>
                    </FormSection>
                );
            }

            return null;
        };

        return (
            <PlanePreviewItem>
                <Form>
                    <FormSection mb={0} title='Settings'>
                        {renderCredentialFormInputs(configuration, reduxFormDispatches)}
                    </FormSection>
                    {renderUserPermissionsSection()}
                </Form>
            </PlanePreviewItem>
        );
    };

    const { crudAction, credential, configuration } = props;

    const content = (
        <Fragment>
            {renderHeader()}
            {renderBody()}
        </Fragment>
    );

    // Prevent the view from loading if we're creating a credential and the configuration list hasn't been loaded yet
    // or we're editing a credential and the configuration list and the credential settings aren't loaded yet
    return (
        <Fragment>
            {configuration.length && (crudAction !== 'edit' || (Object.keys(credential).length > 0)) ? content : null}
        </Fragment>
    );
};

SettingsFormView.propTypes = {
    // Data fields
    configuration: PropTypes.array.isRequired,
    crudAction: PropTypes.string.isRequired,
    userName: PropTypes.string,
    credential: PropTypes.object,

    // Redux Form Dispatches
    change: PropTypes.func,
    clearFields: PropTypes.func,
    setUserPermissionsPlaneState: PropTypes.func
};

export {
    SettingsFormView
};
