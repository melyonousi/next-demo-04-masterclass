import Container from "@/app/components/Container"
import { Priority } from "@/app/enum/priority"
import Loading from "@/app/(dashboard)/loading"
import { TTicket } from "@/app/models/Ticket"
import { notFound } from "next/navigation"
import { Suspense } from "react"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from 'next/headers'
import TicketDelete from "@/app/components/Tickets/TicketDelete"

export const dynamic = 'force-dynamic'

type Props = {
    params: { id: string }
}

export const dynamicParams = true

export async function generateMetadata({ params }: Props) {
    const { id } = params

    const supabase = createServerComponentClient({ cookies })
    const { data } = await supabase.from('Tickets').select().eq('id', id).single()

    return { title: `Master Class | ${data?.title || 'Ticket not found'}` }
}

const Ticket = async ({ params }: Props) => {
    const supabase = createServerComponentClient({ cookies })

    const { data: session } = await supabase.auth.getSession()

    const { data } = await supabase.from('Tickets')
        .select()
        .eq('id', params.id)
        .single()
        
    if (!data) {
        notFound()
    }
    const ticket: TTicket = data

    return (
        <Container className="flex flex-col gap-10">
            <div className="flex justify-between gap-10">
                <h3 className="mb-3">Ticket details</h3>
                {
                    session.session?.user.id === ticket.user_id && (
                        <TicketDelete id={ticket.id} />
                    )
                }
            </div>
            <Suspense fallback={<Loading />}>
                {
                    ticket ? (
                        <div className='bg-zinc-800 rounded flex flex-col gap-0.5 pt-4 ps-4'>
                            <p className='text-2xl font-bold'>{ticket?.title}</p>
                            {
                                ticket?.user && <p className='text-lg'>Created by <strong>{ticket?.user?.name}</strong></p>
                            }

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