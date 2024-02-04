import { TTicket } from "../models/Ticket"

const Ticket = ({ ticket }: { ticket: TTicket }) => {
    return (
        <div className='bg-zinc-800 px-2 py-1.5 rounded flex flex-col gap-0.5'>
            <p className='text-2xl font-bold'>{ticket.title}</p>
            <p className='line-clamp-1'>{ticket.body}</p>
            <p className="italic">{ticket.priority}</p>
        </div>
    )
}

export default Ticket