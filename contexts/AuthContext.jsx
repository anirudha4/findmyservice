import { CustomWidthHeightCenterContainer } from 'components/custom';
import { auth } from 'fire/client';
import { signOut } from 'firebase/auth';
import React, { useContext, useEffect } from 'react'
import { useAuthState, useCreateUserWithEmailAndPassword, useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { Oval } from 'react-loader-spinner';
import { createUserOnSignup } from 'services/request';
import useSWR, { mutate } from 'swr';
import fetcher from 'utils/fetcher';

const AuthContext = React.createContext({
    user: '',
    loading: false,
    error: null
});
export const useUser = () => useContext(AuthContext);
function AuthContextProvider({ children }) {
    const [firebaseUser, loading] = useAuthState(auth);
    const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
    const [createUserWithEmailAndPassword, registeredUser] = useCreateUserWithEmailAndPassword(auth);
    const { data: user } = useSWR(firebaseUser ? `/users/${firebaseUser.uid}` : null, fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false
    });
    const manualLogin = async (email, password) => {
        await signInWithEmailAndPassword(email, password);
    }
    const manualSignup = async (email, password) => {
        await createUserWithEmailAndPassword(email, password)
    }
    const logout = async () => {
        await signOut(auth)
    };
    useEffect(() => {
        if (registeredUser) {
            createUserOnSignup(`/users`, { user: registeredUser.user }).then(res => {
                console.log({ res });
                mutate(`/users/${registeredUser.user.uid}`)
            })
        }
    }, [registeredUser])
    if (loading || (firebaseUser && !user)) {
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
        <AuthContext.Provider value={{ user, manualLogin, manualSignup, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider