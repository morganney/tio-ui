import React from 'react';
import PropTypes from 'prop-types';
import { Plane } from '@hivekit/plane';
import { Button } from '@hivekit/button';
import { Switch, Route } from 'react-router-dom';

import { Patterns } from 'tio-common';

import { SETTINGS_REDUX_FORM } from '../../constants';
import { TypeFormComponent, SettingsFormComponent } from '../';

const { FormFooter, FormFooterItem, FormFooterItemActions } = Patterns.form;

const CredentialFormPlaneView = (props) => {
    const handlePlaneChange = (planeState) => {
        const { history } = props;

        if (planeState === 'closed') {
            history.push('/settings/credentials');
        }
    };

    const handleBackBtn = () => {
        const { crudAction, history } = props;

        history.push(`/settings/credentials/${crudAction}`);
    };

    const handleFormCancel = () => {
        const { history } = props;

        history.push('/settings/credentials');
    };

    const handleFormSubmission = () => {
        const { submit } = props;

        submit(SETTINGS_REDUX_FORM);
    };

    const renderContent = () => {
        const { match } = props;

        return (
            <Switch>
                <Route
                    exact
                    path={`${match.path}/add`}
                    component={TypeFormComponent} />
                <Route
                    exact
                    path={`${match.path}/add/:category/:type`}
                    component={SettingsFormComponent} />
                <Route
                    exact
                    path={`${match.path}/edit/:uuid`}
                    component={SettingsFormComponent} />
            </Switch>
        );
    };

    const renderFooter = () => {
        const { crudAction, history, match, credentialCrudAction } = props;
        const settingsFormRegex = new RegExp(`${match.path}/${crudAction}/.+`, 'i');
        const isSettingsForm = history.location.pathname.match(settingsFormRegex) !== null;
        const actionLabel = crudAction === 'edit' ? 'Save' : 'Create';

        return (
            <FormFooter>
                {isSettingsForm && crudAction === 'add' && (
                    <FormFooterItem>
                        <Button
                            kind='tertiary'
                            ml={2}
                            onClick={handleBackBtn}>
                            Back
                        </Button>
                    </FormFooterItem>
                )}
                <FormFooterItemActions
                    onCancel={handleFormCancel}
                    cancelLabel='Cancel'
                    onAction={handleFormSubmission}
                    actionLabel={actionLabel}
                    actionDisabled={!isSettingsForm || credentialCrudAction.running} />
            </FormFooter>
        );
    };

    const { isCredentialFormView } = props;

    return (
        <Plane
            onChange={handlePlaneChange}
            display={isCredentialFormView ? 'partial' : 'closed'}
            preview={renderContent}
            previewFooter={renderFooter} />
    );
};

CredentialFormPlaneView.propTypes = {
    // Data fields
    credentialCrudAction: PropTypes.object.isRequired,
    isCredentialFormView: PropTypes.bool.isRequired,
    match: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    crudAction: PropTypes.string.isRequired,

    // Dispatches
    submit: PropTypes.func.isRequired
};

export {
    CredentialFormPlaneView
};
