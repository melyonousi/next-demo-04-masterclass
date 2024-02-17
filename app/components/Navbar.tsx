import Link from "next/link"
import Container from "./Container"
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from "next/headers"

export const dynamic = 'force-dynamic'

const Navbar = async () => {
    const supabase = createServerComponentClient({ cookies })
    const { data } = await supabase.auth.getSession()

    return (
        <Container>
            <nav className="flex justify-between items-center gap-4">
                <div className="flex items-center gap-1">
                    <h1 className="flex-grow py-5">
                        <Link href={'/'}>Master Class</Link>
                    </h1>
                </div>
                <ul className="flex items-center gap-4">
                    <li>
                        <Link className="py-5 inline-flex" href={'/'}>Dashboard</Link>
                    </li>
                    <li>
                        <Link className="py-5 inline-flex" href={'/tickets'}>Tickets</Link>
                    </li>
                    <li>
                        <Link className="py-5 inline-flex" href={'/about'}>About</Link>
                    </li>
                    {
                        data.session?.user && (
                            <li className="bg-teal-500 rounded-full size-7 flex justify-center items-center">
                                <Link className="inline-flex " href={'/profile'}>{data.session?.user.user_metadata?.name.substring(0, 2)}</Link>
                            </li>
                        )
                    }
                    {
                        !data.session?.user && (
                            <>
                                <li>
                                    <Link className="py-5 inline-flex" href={'/signup'}>Sign up</Link>
                                </li>
                                <li>
                                    <Link className="py-5 inline-flex" href={'/signin'}>Sign in</Link>
                                </li>
                            </>
                        )
                    }
                </ul>
            </nav>
        </Container>
    )
}

export default Navbar
