'use server'

import { TTicket } from "@/app/models/Ticket"
import { createServerActionClient } from "@supabase/auth-helpers-nextjs"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export const addTicket = async (formData: any) => {
    const supabase = createServerActionClient({ cookies })
    const { data: session } = await supabase.auth.getSession()
    const ticket: TTicket = {
        id: '',
        title: formData.get('title'),
        body: formData.get('body',),
        priority: formData.get('priority'),
        user_email: session.session?.user.email
    }
    Object.entries(ticket).forEach(([key, value]) => {
        if (!value) {
            redirect(`/tickets/create?message=${key} required`);
        }
    });
    const { error } = await supabase.from('Ticketss').insert(ticket)


    if (!error) {
        revalidatePath('/tickets')
        redirect(`/tickets?message=add with success`)
    } else {
        throw new Error('Could not add the new ticket.')
    }
}

export const deleteTicket = async (id: string) => {
    const supabase = createServerActionClient({ cookies })

    const { error } = await supabase.from('Tickets').delete().eq('id', id)

    if (!error) {
        revalidatePath('/tickets')
        redirect(`/tickets?message=delete with success`)
    } else {
        throw new Error('Could not delete ticket id: ' + id)
    }
}