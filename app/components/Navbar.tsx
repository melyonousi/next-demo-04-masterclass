import Link from "next/link"
import Container from "./Container"

const Navbar = () => {
    return (
        <Container>
            <nav className="flex justify-between items-center gap-4">
                <h1 className="flex-grow py-5">Master Class</h1>
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
                </ul>
            </nav>
        </Container>
    )
}

export default Navbar
