import Link from "next/link"
import Container from "./Container"
import useServerSession from "@/config/useServerSession"

const Navbar = async () => {
    const user = await useServerSession()
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
                        user && (
                            <li className="bg-teal-500 rounded-full size-7 flex justify-center items-center">
                                <Link className="inline-flex " href={'/profile'}>{user?.user.user_metadata?.name.substring(0, 2)}</Link>
                            </li>
                        )
                    }
                    {
                        !user && (
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
