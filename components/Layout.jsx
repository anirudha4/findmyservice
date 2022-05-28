import React from 'react'
import styledComponents from 'styled-components';
import Navbar from './Navbar';

const AppShell = styledComponents.div`
    max-height: 100vh;
    height: 100vh;
`;
function Layout({ children, showHeader = true, pageProps }) {
    return (
        <AppShell>
            {showHeader && <Navbar />}
            {children}
        </AppShell>
    )
}

export default Layout