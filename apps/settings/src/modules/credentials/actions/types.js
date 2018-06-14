import { BRANCH_NAME, STEM_NAME } from '../constants';

const actionBase = `${BRANCH_NAME}/${STEM_NAME}`;

const GET_CREDENTIALS_REQUEST = `${actionBase}/get-credentials-request`;
const GET_CREDENTIALS_SUCCESS = `${actionBase}/get-credentials-success`;
const GET_CREDENTIALS_ERROR = `${actionBase}/get-credentials-fail`;

const GET_CREDENTIALS_FILTERS_REQUEST = `${actionBase}/get-credentials-filters-request`;
const GET_CREDENTIALS_FILTERS_SUCCESS = `${actionBase}/get-credentials-filters-success`;
const GET_CREDENTIALS_FILTERS_ERROR = `${actionBase}/get-credentials-filters-error`;

const SET_CREDENTIALS_FETCH_OPTIONS = `${actionBase}/set-credentials-fetch-options`;

const DELETE_CREDENTIAL_REQUEST = `${actionBase}/delete-credential-request`;
const DELETE_CREDENTIAL_SUCCESS = `${actionBase}/delete-credential-success`;
const DELETE_CREDENTIAL_ERROR = `${actionBase}/delete-credential-error`;

const SET_NOTIFICATION_STATE = `${actionBase}/set-notification-state`;

export {
    GET_CREDENTIALS_REQUEST,
    GET_CREDENTIALS_SUCCESS,
    GET_CREDENTIALS_ERROR,
    GET_CREDENTIALS_FILTERS_REQUEST,
    GET_CREDENTIALS_FILTERS_SUCCESS,
    GET_CREDENTIALS_FILTERS_ERROR,
    SET_CREDENTIALS_FETCH_OPTIONS,
    DELETE_CREDENTIAL_REQUEST,
    DELETE_CREDENTIAL_SUCCESS,
    DELETE_CREDENTIAL_ERROR,
    SET_NOTIFICATION_STATE
};
