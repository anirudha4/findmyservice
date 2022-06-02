import React from 'react'
import styledComponents from 'styled-components';
import DashboardLayout from './DashboardLayout';
import Navbar from './Navbar';

const AppShell = styledComponents.div`
    max-height: 100vh;
    height: 100vh;
`;
function Layout({ children, showHeader = true, pageProps, isDashboardRoute, user }) {
    return (
        <AppShell>
            {showHeader && <Navbar />}
            {isDashboardRoute ? (
                <DashboardLayout user={user}>
                    {children}
                </DashboardLayout>
            ): (
                <>{children}</>
            )}
        </AppShell>
    )
}

export default Layout