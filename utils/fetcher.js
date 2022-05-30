import { api } from "services/request";

export default async function fetcher(url) {
    const { data } = await api.get(url);
    return data;
}
export const fetchUser = async (url, token) => {
    const { data } = await api.get(url, {
        headers: {
            token
        }
    });
    return data;
}