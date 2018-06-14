import { Rest } from 'tio-alloy';

export const requestPasswordReset = (username) => {
    return Rest.fetch({
        url: '/session/reset-password',
        method: 'POST',
        body: JSON.stringify({ username }),
        // Endpoint returns no response, i.e. empty body
        ignoreResponseBody: true
    });
};
