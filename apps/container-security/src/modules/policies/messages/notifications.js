import { defineMessages } from 'react-intl';

const notificationMessages = defineMessages({
    createPolicySuccess: {
        id: 'CONSEC_CREATE_POLICY_SUCCESS',
        description: 'Success message for creating a policy.',
        defaultMessage: 'Successfully created the policy.'
    },
    createPolicyFailure: {
        id: 'CONSEC_CREATE_POLICY_FAILURE',
        description: 'Failure message for creating a policy.',
        defaultMessage: 'Failed to create the policy.'
    },
    deletePolicyRequest: {
        id: 'CONSEC_DELETE_POLICY_REQUEST',
        description: 'Question in the notification, when you attempt to delete a policy.',
        defaultMessage: 'Are you sure you wish to delete this Policy?'
    },
    deletePolicySuccess: {
        id: 'CONSEC_DELETE_POLICY_SUCCESS',
        description: 'Success message for deleting a policy.',
        defaultMessage: 'Successfully deleted the policy.'
    },
    deletePolicyFailure: {
        id: 'CONSEC_DELETE_POLICY_FAILURE',
        description: 'Failure message for deleting a policy.',
        defaultMessage: 'Failed to delete the policy.'
    },
    editPolicySuccess: {
        id: 'CONSEC_EDIT_POLICY_SUCCESS',
        description: 'Success message for editing a policy.',
        defaultMessage: 'Successfully edited the policy.'
    },
    editPolicyFailure: {
        id: 'CONSEC_EDIT_POLICY_FAILURE',
        description: 'Failure message for editing a policy.',
        defaultMessage: 'Failed to edit the policy.'
    }
});

export {
    notificationMessages
};
