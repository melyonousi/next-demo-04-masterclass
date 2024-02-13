'use client'

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation"
import { useState } from "react"

const AuthSignOut = () => {
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const handleSignOut = async () => {
        setLoading(true)
        const supabase = createClientComponentClient()
        const { error } = await supabase.auth.signOut();
        setLoading(false)
        if (error) {
            router.refresh()
            console.log(error.message)
        } else {
            router.refresh()
            router.push('/')
        }
    }
    return <button
        onClick={handleSignOut}
        disabled={loading}
        className="dark:bg-zinc-800 bg-zinc-700 rounded w-fit py-1.5 px-2
              hover:bg-opacity-50
              disabled:bg-opacity-100
            disabled:text-zinc-600">
        {loading ? 'Sign Out...' : 'Sign Out'}
    </button>

}

export default AuthSignOut