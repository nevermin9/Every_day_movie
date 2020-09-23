import axios from 'axios';
const baseURL = process.env.API_BASE_URL;

export const Client = {
    fetchData(url, { headers = {}, method = 'get', data }) {
        if (!headers['Content-Type']) {
            headers['Content-Type'] = 'application-json'
        }

        return axios({ method, baseURL, headers, url, data });
    }
}

export function Query(obj) {
    let str = [];

    for (let key of Object.keys(obj)) {
        str.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
    }

    return str.join('&');
}
