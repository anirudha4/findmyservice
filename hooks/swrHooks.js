import { useState, useEffect } from "react";
import useSWR from "swr";
import fetcher from "utils/fetcher";
export const useSWRHook = (url) => {
    const [loading, setLoading] = useState(true);
    const { data, error } = useSWR(url, fetcher);
    console.log({ data, error });
    return { data, loading, error }
}