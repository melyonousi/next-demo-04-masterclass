import Container from "@/app/components/Container"
import TicketCreate from "@/app/components/Tickets/TicketCreate"
import Link from "next/link"

const CreateTicket = () => {
  return (
    <Container>
      <h3>Add new Ticket</h3>
      <div className='w-full flex justify-end items-end'>
        <Link className='text-lg inline-flex text-emerald-400 hover:text-emerald-300 underline' href={'/tickets'}>tickets</Link>
      </div>
      <TicketCreate />
    </Container>
  )
}

export default CreateTicket