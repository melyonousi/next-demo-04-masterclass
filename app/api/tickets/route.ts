import { TTicket } from "@/app/models/Ticket"
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

export const dynamic = 'force-dynamic'

export const POST = async (request: NextRequest) => {
    const ticket: TTicket = await request.json()
    const errors: any = {}
    if (!ticket.title) {
        errors['title'] = 'title required'
    }
    if (!ticket.body) {
        errors['body'] = 'body required'
    }
    if (!ticket.user_id) {
        errors['user_id'] = 'user id required'
    }
    if (Object.keys(errors).length !== 0) {
        return NextResponse.json({ errors: errors, message: 'something went wrong', ok: false }, { status: 400 })
    }

    try {
        const supabase = createRouteHandlerClient({ cookies })

        const { data: session } = await supabase.auth.getSession()
        
        const { data, error } = await supabase.from('Tickets')
            .insert({
                title: ticket.title,
                body: ticket.body,
                priority: ticket.priority,
                user_email: session.session?.user.email
            })
            .select()
            .single()
        if (error) {
            return NextResponse.json({ message: error, ok: false }, { status: 400 })
        }
        else {
            return NextResponse.json({ message: 'created with success', ticket: data, ok: true }, { status: 200 })
        }
    } catch (error: any) {
        return NextResponse.json({ message: error.message, ok: false }, { status: 400 })
    }
}