import React, { Suspense } from 'react'
import Loading from '@/app/(dashboard)/loading'
import Link from 'next/link'
import Ticket from '@/app/components/Tickets/Ticket'
import { TTicket } from '@/app/models/Ticket'
import Container from '@/app/components/Container'
import { Metadata } from 'next'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from "next/headers"
import { redirect } from "next/navigation";

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: "Master Class | Tickets"
};

const Tickets = async () => {
  const supabase = createServerComponentClient({ cookies })
  const { data: session } = await supabase.auth.getSession()

  if (!session.session) {
    redirect('/signin')
  }

  const { data, error } = await supabase.from('Tickets').select().returns<TTicket[]>()
  
  if (error) {
    console.log(error)
  }

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
            data?.map((ticket: TTicket) => (
              <Ticket key={ticket.id} ticket={ticket} />
            ))
          }
          {
            !data && <p>no tickets found</p>
          }
          {
            data?.length == 0 && <p>no tickets found</p>
          }
        </Suspense>
      </div>
    </Container>
  )
}

export default Tickets