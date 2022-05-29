import { api } from "services/request";

export default async function fetcher(url) {
    const { data } = await api.get(url);
    return data;
}
export const fetchUser = async (url) => {
    if (!url) return { exists: false }
    return await fetcher(url);

}