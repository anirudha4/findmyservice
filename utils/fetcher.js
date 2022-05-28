import { api } from "services/request";

export default async (url) => {
    const { data } = await api.get(url);
    return data;
}