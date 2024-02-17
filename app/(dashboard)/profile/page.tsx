import AuthSignOut from "@/app/components/Auth/AuthSignOut";
import Container from "@/app/components/Container"
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from "next/headers"
import { redirect } from "next/navigation";

export const dynamic = 'force-dynamic'

export async function generateMetadata() {
    const supabase = createServerComponentClient({ cookies })
    const { data } = await supabase.auth.getSession()

    return { title: `Master Class | ${data.session?.user.user_metadata.name || 'Ticket not found'}` }
}

const Profile = async () => {
    const supabase = createServerComponentClient({ cookies })
    const { data } = await supabase.auth.getSession()

    if (!data.session) {
        redirect('/signin')
    }
    
    return (
        <Container>
            <h2>Information: </h2>
            <p>{data.session?.user.user_metadata?.name}</p>
            <p>{data.session?.user.user_metadata?.email}</p>
            <p>{data.session?.user.user_metadata?.avatar}</p>
            <AuthSignOut />
        </Container>
    )
}

export default Profile
