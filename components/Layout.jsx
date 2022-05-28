import React from 'react'

function Layout({ children, showHeader = true }) {
    return (
        <div>
            {showHeader && <h1>Header</h1>}
            {children}
        </div>
    )
}

export default Layout