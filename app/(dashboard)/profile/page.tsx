import AuthSignOut from "@/app/components/Auth/AuthSignOut";
import Container from "@/app/components/Container"
import useServerSession from "@/config/useServerSession"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Master Class | Profile"
};

const Profile = async () => {
    const user = await useServerSession()
    return (
        <Container>
            <h2>Information: </h2>
            <p>{user?.user?.user_metadata?.name}</p>
            <p>{user?.user?.user_metadata?.email}</p>
            <p>{user?.user?.user_metadata?.avatar}</p>
            <AuthSignOut />
        </Container>
    )
}

export default Profile
