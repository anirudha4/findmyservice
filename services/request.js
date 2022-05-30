import axios from 'axios';

const headers = {
    'Content-Type': 'application/json'
}
export const api = axios.create({
    baseURL: '/api',
});
export const createSellerRequest = async (url, data, hds = headers) => {
    return await api.post(url, data, { headers: hds })
}

export const deleteSellerRequest = async (url, data, hds = headers) => {
    return await api.delete(url, { headers: hds })
}

// create user
export const createUserOnSignup = async (url, data, hds = headers) => {
    return await api.post(url, data, { headers: hds })
}

export const approveSeller = async (url, data, hds = headers) => {
    return await api.post(url, data, { headers: hds })
}