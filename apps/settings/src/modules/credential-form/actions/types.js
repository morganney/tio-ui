import { BRANCH_NAME, STEM_NAME } from '../constants';

const actionBase = `${BRANCH_NAME}/${STEM_NAME}`;

const GET_CONFIGURATIONS_LIST_REQUEST = `${actionBase}/get-configurations-list-request`;
const GET_CONFIGURATIONS_LIST_SUCCESS = `${actionBase}/get-configurations-list-success`;
const GET_CONFIGURATIONS_LIST_ERROR = `${actionBase}/get-configurations-list-error`;

const CREATE_CREDENTIAL_REQUEST = `${actionBase}/create-credential-request`;
const CREATE_CREDENTIAL_SUCCESS = `${actionBase}/create-credential-success`;
const CREATE_CREDENTIAL_ERROR = `${actionBase}/create-credential-error`;

const EDIT_CREDENTIAL_REQUEST = `${actionBase}/edit-credential-request`;
const EDIT_CREDENTIAL_SUCCESS = `${actionBase}/edit-credential-success`;
const EDIT_CREDENTIAL_ERROR = `${actionBase}/edit-credential-error`;

const GET_CREDENTIAL_REQUEST = `${actionBase}/get-credential-request`;
const GET_CREDENTIAL_SUCCESS = `${actionBase}/get-credential-success`;
const GET_CREDENTIAL_ERROR = `${actionBase}/get-credential-error`;

const SET_CREDENTIAL = `${actionBase}/set-credential`;
const SET_SEARCH = `${actionBase}/set-search`;
const SET_USER_PERMISSIONS_PLANE_STATE = `${actionBase}/set-user-permissions-plane-state`;

export {
    GET_CONFIGURATIONS_LIST_REQUEST,
    GET_CONFIGURATIONS_LIST_SUCCESS,
    GET_CONFIGURATIONS_LIST_ERROR,
    CREATE_CREDENTIAL_REQUEST,
    CREATE_CREDENTIAL_SUCCESS,
    CREATE_CREDENTIAL_ERROR,
    EDIT_CREDENTIAL_REQUEST,
    EDIT_CREDENTIAL_SUCCESS,
    EDIT_CREDENTIAL_ERROR,
    GET_CREDENTIAL_REQUEST,
    GET_CREDENTIAL_SUCCESS,
    GET_CREDENTIAL_ERROR,
    SET_CREDENTIAL,
    SET_SEARCH,
    SET_USER_PERMISSIONS_PLANE_STATE
};
