import React from 'react'
import AuthNavbar from '../components/AuthNavbar'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from "next/headers"
import { redirect } from "next/navigation";

export const dynamic = 'force-dynamic'

const AuthLayout = async ({ children }: any) => {
    const supabase = createServerComponentClient({ cookies })
    const { data } = await supabase.auth.getSession()

    if (data.session) {
        redirect('/profile')
    }

    return (
        <>
            <AuthNavbar />
            {children}
        </>
    )
}

export default AuthLayout