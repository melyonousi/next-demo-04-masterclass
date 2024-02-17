'use client'

import { deleteTicket } from "@/app/actions/tickets"
import { useTransition } from "react"
import { TiDelete } from "react-icons/ti"
import SubmitButton from "@/app/components/Tickets/SubmitButton"

const TicketDelete = ({ id }: { id: string }) => {
  const [isPending, startTransition] = useTransition()

  return (
    <SubmitButton
      text={<><TiDelete className="text-2xl" /> Delete Ticket</>}
      textPending={<><TiDelete className="text-2xl" /> Deleting Ticket...</>}
      disabled={isPending}
      event={() => startTransition(() => deleteTicket(id))} />
  )
}

export default TicketDelete
