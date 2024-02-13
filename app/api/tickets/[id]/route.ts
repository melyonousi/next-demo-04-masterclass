import { Table } from "@/app/enum/tables";
import { TTicket } from "@/app/models/Ticket";
import { openDatabase } from "@/db/database";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic'

type Props = {
    params: { id: string }
}

export const GET = async (_: any, { params }: Props) => {

    // const db = await openDatabase()

    // const select = await db.get(`
    //                 SELECT t.*, u.*
    //                 FROM ${Table.TICKETS} AS t
    //                 INNER JOIN ${Table.USERS} AS u ON t.user_id = u.id
    //                 WHERE t.id = ?
    //             `, params.id);

    // if (!select) {
    //     await db.close()
    //     return NextResponse.json({ error: 'ticket not found', ok: false }, { status: 404 })
    // }

    // const ticket: TTicket = {
    //     id: select.id,
    //     title: select.title,
    //     body: select.body,
    //     priority: select.priority,
    //     user: {
    //         id: select?.user_id,
    //         name: select?.name,
    //         email: select?.email,
    //     }
    // }

    // await db.close()
    // return NextResponse.json(ticket)

    const res = await fetch(`${process.env.END_POINT}/tickets/${params.id}`)
    const ticket: TTicket = await res.json()
    return NextResponse.json(ticket, { status: 200 })
}

export const DELETE = async (_: any, { params }: { params: { id: string } }) => {
    // const db = await openDatabase()

    // const ticket: TTicket | undefined = await db.get(`SELECT * FROM ${Table.TICKETS} where id = (?)`, [params.id]);

    // if (ticket) {
    //     await db.run(`DELETE FROM ${Table.TICKETS} WHERE id = (?)`, [params.id]);

    //     await db.close()
    //     return NextResponse.json({ ticket, success: 'deleted with success' })
    // }

    // await db.close()
    // return NextResponse.json({ error: 'ticket not found', ok: false }, { status: 404 })

    const res = await fetch(`${process.env.END_POINT}/tickets/${params.id}`, {
        method: 'DELETE'
    })
    // const ticket: TTicket = await res.json()
    return NextResponse.json('success', { status: 200 })
}