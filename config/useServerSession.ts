import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from "next/headers"

const useServerSession = async () => {
    const supabase = createServerComponentClient({ cookies })
    const { data } = await supabase.auth.getSession()
    return data.session
}

export default useServerSession
