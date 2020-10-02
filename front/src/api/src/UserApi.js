import { Client } from './Client';

export function signUpUser({ data }) {
    return Client.fetchData('/api/v1/auth/signup', { 
        method: 'POST',
        data, 
    }).then(response => {
        return response.data;
    }).catch(err => Promise.reject(err));
}
