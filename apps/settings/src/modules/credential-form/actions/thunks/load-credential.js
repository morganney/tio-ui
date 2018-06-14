import { push } from 'react-router-redux';
import { initialize } from 'redux-form';

import { BRANCH_NAME, STEM_NAME, SETTINGS_REDUX_FORM } from './../../constants';
import { getCredential, fetchConfigurationsList } from './../';

import { setNotificationState } from '../../../credentials/actions';

const loadCredential = (uuid) => {
    return async (dispatch, getState) => {
        const { configurationsList } = getState()[BRANCH_NAME][STEM_NAME];

        if (configurationsList.length === 0) {
            await Promise.all([
                dispatch(fetchConfigurationsList()),
                dispatch(getCredential(uuid))
            ]);
        } else {
            await dispatch(getCredential(uuid));
        }

        const { credential } = getState()[BRANCH_NAME][STEM_NAME];
        const success = Object.keys(credential).length > 0;

        if (success) {
            const { name, description, settings } = credential;

            dispatch(initialize(SETTINGS_REDUX_FORM, {
                name,
                description,
                ...settings
            }));
        } else {
            dispatch(setNotificationState({
                status: 'critical',
                message: 'Credential could not be loaded.'
            }));
            dispatch(push('/settings/credentials'));
        }
    };
};

export {
    loadCredential
};
