import { CustomWidthHeightCenterContainer } from 'components/custom';
import { auth } from 'fire/client';
import { signOut } from 'firebase/auth';
import React, { useContext, useState, useEffect } from 'react'
import { useAuthState, useCreateUserWithEmailAndPassword, useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { Oval } from 'react-loader-spinner';
import useSWR from 'swr';
import { fetchUser } from 'utils/fetcher';

const AuthContext = React.createContext({
    user: '',
    loading: false,
    error: null
});
export const useUser = () => useContext(AuthContext);
function AuthContextProvider({ children }) {
    const [user, userLoading] = useAuthState(auth);
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
    const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(auth);
    // const { data: currentUser, error } = useSWR(user && [`/users/get-user`, user?.accessToken], fetchUser);
    const manualLogin = async (email, password) => {
        await signInWithEmailAndPassword(email, password);
    }
    const manualSignup = async (email, password) => {
        await createUserWithEmailAndPassword(email, password)
    }
    const logout = async () => {
        setLoading(true)
        setCurrentUser(null);
        await signOut(auth);
        setLoading(false);
    };

    useEffect(() => {
        async function loadUser() {
            try {
                const data = await fetchUser(`/users/get-user`, user.accessToken)
                setCurrentUser(data);
                if(!userLoading) {
                    setLoading(false)
                }
            } catch (err) {
                setCurrentUser(null);
                if(!userLoading) {
                    setLoading(false)
                }
            } 
        }
        loadUser();
    }, [user, userLoading])
    if (loading || userLoading) {
        return <CustomWidthHeightCenterContainer>
            <Oval
                ariaLabel="loading-indicator"
                height={100}
                width={100}
                strokeWidth={5}
                strokeWidthSecondary={1}
                color="black"
                secondaryColor="#fcfcfc"
            />
        </CustomWidthHeightCenterContainer>
    }
    return (
        <AuthContext.Provider value={{ user, manualLogin, manualSignup, logout, currentUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider