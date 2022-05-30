import React, { useState, useEffect } from 'react'
import { fetchUser } from 'utils/fetcher';

function useAuth(user) {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState();

    useEffect(() => {
        async function loadUser() {
            try {
                const data = await fetchUser(`/users/get-user`, user.accessToken)
                setUser(data);
            } catch (err) {
                setUser(null);
            } finally {
                setLoading(false);
            }
        }
        loadUser();
    }, [user])
    return { currentUser: user, loading }
}

export default useAuth