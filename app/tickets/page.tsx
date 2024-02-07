import React, { Suspense } from 'react'
import Container from '../components/Container'
import { TTicket } from '../models/Ticket'
import Ticket from '../components/Tickets/Ticket'
import Loading from '@/app/loading'
import Link from 'next/link'

const fetchTickets = async () => {
  const res = await fetch(process.env.BASE_API + '/tickets',
    {
      next: {
        revalidate: 0,
      }
    }
  )
  return res.json()
}

const Tickets = async () => {
  const tickets: Array<TTicket> = await fetchTickets()
  return (
    <Container>
      <h2>Tickets</h2>
      <p>Currently opened Tickets</p>
      <div className='w-full flex justify-end items-end'>
        <Link className='text-lg inline-flex text-emerald-400 underline hover:text-emerald-300' href={'/tickets/create'}>create a ticket</Link>
      </div>
      <div className='flex flex-col gap-2 mt-5'>
        <Suspense fallback={<Loading />}>
          {
            tickets.map((ticket: TTicket) => (
              <Ticket key={ticket.id} ticket={ticket} />
            ))
          }
          {
            tickets.length <= 0 && <p>no tickets found</p>
          }
        </Suspense>
      </div>
    </Container>
  )
}

export default Tickets