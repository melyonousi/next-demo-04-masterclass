import React from 'react'
import Container from '@/app/components/Container'
import Link from 'next/link'

const AuthNavbar = () => {
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
                        <Link className="py-5 inline-flex" href={'/signup'}>Sign up</Link>
                    </li>
                    <li>
                        <Link className="py-5 inline-flex" href={'/signin'}>Sign in</Link>
                    </li>
                </ul>
            </nav>
        </Container>
    )
}

export default AuthNavbar
