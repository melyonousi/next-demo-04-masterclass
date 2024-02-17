'use client'

import Container from "@/app/components/Container";
import SubmitButton from "@/app/components/Tickets/SubmitButton";

interface ErrorProps {
    error: string | Error;
    reset: () => void;
}

const Error = ({ error, reset }: ErrorProps) => {
    return (
        <Container className="flex flex-col justify-center items-center min-h-[50vh]">
            <div className="flex flex-col gap-1">
                <h2>Oh No!</h2>
                <p className="font-bold">{error.toString()}</p>
                <SubmitButton text="Maybe try again?" event={() => reset()} className="mx-auto" />

            </div>
        </Container>
    )
}

export default Error
