import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

import {
    BRANCH_NAME as CORE_BRANCH_NAME,
    STEM_NAME as CORE_STEM_NAME,
    DEFAULTS
} from 'tio-app/modules/session/constants';

import { SettingsFormView } from '../presentations';
import { BRANCH_NAME, STEM_NAME, SETTINGS_REDUX_FORM } from '../../constants';
import {
    fetchConfigurationsList,
    setCredential,
    createCredentialAndDoPostRender,
    setUserPermissionsPlaneState,
    editCredentialAndDoPostRender,
    loadCredential
} from '../../actions';

class SettingsFormLifeCycles extends Component {
    static propTypes = {
        // Data types
        configurationsList: PropTypes.array.isRequired,
        crudAction: PropTypes.string.isRequired,
        uuid: PropTypes.string,

        // Dispatches
        setCredential: PropTypes.func.isRequired,
        loadCredential: PropTypes.func.isRequired,
        fetchConfigurationsList: PropTypes.func.isRequired
    };

    componentDidMount () {
        const { configurationsList, crudAction, uuid } = this.props;

        if (crudAction === 'edit') {
            this.props.loadCredential(uuid);
        } else if (configurationsList.length === 0) {
            this.props.fetchConfigurationsList();
        }
    }

    componentWillUnmount () {
        this.props.setCredential({});
    }

    render () {
        return (
            <SettingsFormView {...this.props} />
        );
    }
}

const mapStateToProps = (state, props) => {
    const { configurationsList, credential } = state[BRANCH_NAME][STEM_NAME];
    const { user_name: userName } = state[CORE_BRANCH_NAME][CORE_STEM_NAME][DEFAULTS];
    const { uuid } = props.match.params;
    const crudAction = props.history.location.pathname.match(/\/edit\//gi) ? 'edit' : 'add';
    let { category, type } = props.match.params;
    let configuration = [];

    // If a credential was loaded, set the category and type from that
    if (uuid && credential.category && credential.type) {
        category = credential.category.id;
        type = credential.type.id;
    }

    // Determine the configuration based on the category and type in the store
    for (let categoryIndex = configurationsList.length; categoryIndex--;) {
        const categoryConfig = configurationsList[categoryIndex];

        if (categoryConfig.id === category) {
            for (let typeIndex = categoryConfig.types.length; typeIndex--;) {
                const typeConfig = categoryConfig.types[typeIndex];

                if (typeConfig.id === type) {
                    configuration = typeConfig.configuration;
                }
            }
        }
    }

    return {
        configurationsList,
        configuration,
        credential,
        category,
        type,
        uuid,
        crudAction,
        userName
    };
};

const mapDispatchToProps = {
    fetchConfigurationsList,
    createCredentialAndDoPostRender,
    setUserPermissionsPlaneState,
    editCredentialAndDoPostRender,
    loadCredential,
    setCredential
};

let SettingsFormContainer = reduxForm({
    form: SETTINGS_REDUX_FORM,
    onSubmit: (values, dispatch, props) => {
        const { name, description, permissions, ...settings } = values;
        const { type, uuid, crudAction } = props;
        const formData = {
            name,
            description,
            settings,
            type,
            permissions: permissions || []
        };

        if (crudAction === 'edit') {
            dispatch(editCredentialAndDoPostRender(uuid, formData));

            return;
        }

        dispatch(createCredentialAndDoPostRender(formData));
    }
})(SettingsFormLifeCycles);

SettingsFormContainer = connect(mapStateToProps, mapDispatchToProps)(SettingsFormContainer);

export {
    SettingsFormContainer
};
