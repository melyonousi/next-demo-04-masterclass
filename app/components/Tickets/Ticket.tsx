'use client'

import Link from "next/link"
import { TTicket } from "../../models/Ticket"
import { Priority } from "../../enum/priority"
import { useRouter } from "next/navigation"

const Ticket = ({ ticket }: { ticket: TTicket }) => {
    const router = useRouter()
    const handleDelete = async () => {
        const res = await fetch(`/api/tickets/${ticket.id}`, {
            method: 'DELETE'
        })
        if (res.ok) {
            router.refresh()
        }
    }
    return (
        <div className="relative">
            <button onClick={handleDelete} className="absolute top-4 end-4 z-10">delete</button>
            <Link href={'/tickets/' + ticket.id}>
                <div className=' bg-zinc-800 rounded flex flex-col gap-0.5 pt-4 ps-4'>
                    <p className='text-2xl font-bold pe-4'>{ticket.title}</p>
                    <p className='line-clamp-2 pe-4 mb-4'>{ticket.body}</p>
                    <p className={`self-end rounded-ss rounded-ee px-1 py-0.5 font-bold
                    ${ticket.priority === Priority.LOW ? 'bg-teal-400 text-teal-600' : ''}
                    ${ticket.priority === Priority.MEDIUM ? 'bg-blue-400 text-blue-600' : ''}
                    ${ticket.priority === Priority.HIGH ? 'bg-red-400 text-red-600' : ''}
                `}>{ticket.priority} priority</p>
                </div>
            </Link>
        </div>
    )
}

export default Ticket