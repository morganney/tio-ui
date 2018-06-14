import { Rest } from 'tio-alloy';

export const setNewPassword = (password, key) => {
    return Rest.fetch({
        url: `/session/reset-password/${key}`,
        method: 'PUT',
        body: JSON.stringify({ password })
    });
};
