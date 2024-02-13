import React from 'react'
import AuthNavbar from '../components/AuthNavbar'

const AuthLayout = ({ children }: any) => {
    return (
        <>
            <AuthNavbar />
            {children}
        </>
    )
}

export default AuthLayout