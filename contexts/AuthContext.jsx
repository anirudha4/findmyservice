import { CustomWidthHeightCenterContainer } from 'components/custom';
import { auth } from 'fire/client';
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
    const [user, loading] = useAuthState(auth);
    const [manualLogin] = useSignInWithEmailAndPassword(auth);
    const [manualSignup] = useCreateUserWithEmailAndPassword(auth);
    if (loading) {
        return <CustomWidthHeightCenterContainer>
            <Oval
                ariaLabel="loading-indicator"
                height={100}
                width={100}
                strokeWidth={5}
                strokeWidthSecondary={1}
                color="black"
                secondaryColor="white"
            />
        </CustomWidthHeightCenterContainer>
    }
    return (
        <AuthContext.Provider value={{ user, manualLogin, manualSignup }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider