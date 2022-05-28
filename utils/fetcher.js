export default async (url) => {
    const { data } =  axios.get(url);
    return data;
}