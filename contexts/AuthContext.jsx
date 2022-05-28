import { CustomWidthHeightCenterContainer } from 'components/custom';
import { auth } from 'fire/client';
import { signOut } from 'firebase/auth';
import React, { useContext } from 'react'
import { useAuthState, useCreateUserWithEmailAndPassword, useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { Oval } from 'react-loader-spinner';

const AuthContext = React.createContext({
    user: '',
    loading: false,
    error: null
});
export const useUser = () => useContext(AuthContext);
function AuthContextProvider({ children }) {
    const [user, loading, error] = useAuthState(auth);
    const [manualLogin] = useSignInWithEmailAndPassword(auth);
    const [manualSignup] = useCreateUserWithEmailAndPassword(auth);
    const logout = () => {
        signOut(auth)
        window.location.href = '/auth'
    };
    if (loading) {
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