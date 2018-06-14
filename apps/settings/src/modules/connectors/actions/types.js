import { BRANCH_NAME, STEM_NAME } from '../constants';

const actionBase = `${BRANCH_NAME}/${STEM_NAME}`;

const GET_CONNECTORS_REQUEST = `${actionBase}/get-connectors-request`;
const GET_CONNECTORS_SUCCESS = `${actionBase}/get-connectors-success`;
const GET_CONNECTORS_ERROR = `${actionBase}/get-connectors-fail`;

export {
    GET_CONNECTORS_REQUEST,
    GET_CONNECTORS_SUCCESS,
    GET_CONNECTORS_ERROR
};
