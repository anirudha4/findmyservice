import Layout from 'components/Layout'
import AuthContextProvider from 'contexts/AuthContext'
import { auth } from 'fire/client';
import { useAuthState } from 'react-firebase-hooks/auth';
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  const [user] = useAuthState(auth);
  return (
    <AuthContextProvider>
      <Layout {...pageProps} user={user}>
        <Component {...pageProps} user={user} />
      </Layout>
    </AuthContextProvider>
  )
}

export default MyApp
