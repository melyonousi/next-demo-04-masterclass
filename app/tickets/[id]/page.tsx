import Container from "@/app/components/Container"
import { Priority } from "@/app/enum/priority"
import Loading from "@/app/loading"
import { TTicket } from "@/app/models/Ticket"
import { notFound } from "next/navigation"
import { Suspense } from "react"

export const dynamicParams = true

export async function generateStaticParams() {
    const res = await fetch(process.env.BASE_API + '/tickets')
    const tickets: Array<TTicket> = await res.json()
    return tickets.map((ticket: TTicket) => ({
        id: ticket.id
    }))
}

const fetchTicket = async (id: string) => {
    const res = await fetch(process.env.BASE_API + '/tickets/' + id, {
        next: {
            revalidate: 60
        }
    })
    if (!res.ok) {
        notFound()
    }
    return res.json()
}

const Ticket = async ({ params }: { params: { id: string } }) => {
    const ticket: TTicket = await fetchTicket(params.id)

    return (
        <Container>
            <h3 className="mb-3">Ticket details</h3>
            <Suspense fallback={<Loading />}>
                {
                    ticket ? (
                        <div className='bg-zinc-800 rounded flex flex-col gap-0.5 pt-4 ps-4'>
                            <p className='text-2xl font-bold'>{ticket?.title}</p>
                            <p className='text-lg'>Created by <strong>{ticket?.user?.name}</strong></p>
                            {
                                ticket.user_email && <p className='text-lg'>Created by <strong>{ticket?.user_email}</strong></p>
                            }
                            <p>{ticket?.body}</p>
                            <p className={`self-end rounded-ss rounded-ee px-1 py-0.5 font-bold
                    ${ticket?.priority === Priority.LOW ? 'bg-teal-400 text-teal-600' : ''}
                    ${ticket?.priority === Priority.MEDIUM ? 'bg-blue-400 text-blue-600' : ''}
                    ${ticket?.priority === Priority.HIGH ? 'bg-red-400 text-red-600' : ''}
                `}>{ticket?.priority} priority</p>
                        </div>
                    ) : (<p className="text-red-500">Ticket not found</p>)
                }
            </Suspense>
        </Container>
    )
}

export default Ticket