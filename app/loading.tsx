import React from 'react'
import Container from './components/Container'

const Loading = () => {
    return (
        <main>
            <Container>
                <div className='min-h-[calc(100vh_-76px)] flex flex-col justify-center items-center gap-2'>
                    <h2>loading...</h2>
                    <p>Hopefully not for too long :)</p>
                </div>
            </Container>
        </main>
    )
}

export default Loading