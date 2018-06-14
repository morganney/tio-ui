import { Rest } from 'tio-alloy';

export const login = (creds) => {
    return Rest.fetch({
        url: '/session',
        method: 'POST',
        body: JSON.stringify(creds)
    });
};
