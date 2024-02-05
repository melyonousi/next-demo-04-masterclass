import React from 'react'
import Container from '../components/Container'
import { TTicket } from '../models/Ticket'
import Ticket from '../components/Ticket'

const fetchTickets = async () => {
  const res = await fetch(process.env.NEXT_PUBLIC_BASE_API + '/tickets', {
    next: {
      revalidate: 0,
    }
  })
  return await res.json()
}

const Tickets = async () => {
  const tickets: Array<TTicket> = await fetchTickets()
  return (
    <Container>
      <h2>Tickets</h2>
      <p>Currently opened Tickets</p>
      <div className='flex flex-col gap-2 mt-5'>
        {
          tickets.map((ticket: TTicket) => (
            <Ticket key={ticket.id} ticket={ticket} />
          ))
        }
      </div>
      {
        tickets.length <= 0 ?? <p>no tickets found</p>
      }
    </Container>
  )
}

export default Tickets