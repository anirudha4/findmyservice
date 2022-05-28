import axios from 'axios';

const headers = {
    'Content-Type': 'application/json'
}
const api = axios.create({
    baseURL: '/api',
});
export const createSellerRequest = async (url, data, hds = headers) => {
    return await api.post(url, data, { headers: hds })
}