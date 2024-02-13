import React from 'react'
import Link from 'next/link'
import Container from './Container'
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Master Class | Not Found"
};

const NotFound = ({ title, description, url, urlName }: { title?: string, description?: string, url?: string, urlName?: string }) => {
    return (
        <main>
            <Container>
                <div className='min-h-[calc(100vh_-76px)] flex flex-col justify-center items-center gap-2'>
                    <h2>
                        {title ?? 'There was a problem.'}
                    </h2>
                    <p className='text-lg'>
                        {description ?? 'We could not find the page you were looking for.'}
                    </p>
                    <Link className='inline-flex border rounded px-2 py-1 bg-zinc-800 hover:bg-opacity-30 transition-all duration-300 ease-in-out'
                        href={url ?? '/'}>
                        {urlName ?? 'Dashboard'}
                    </Link>
                </div>
            </Container>
        </main>
    )
}

export default NotFound
