import { Priority } from "@/app/enum/priority"
import { Table } from "@/app/enum/tables"
import { TTicket } from "@/app/models/Ticket"
import { openDatabase } from "@/db/database"
import { NextRequest, NextResponse } from "next/server"

export const dynamic = 'force-dynamic'

export const GET = async () => {
    // const db = await openDatabase()
    // try {
    //     const tickets: Array<TTicket> = await db.all(`SELECT * FROM ${Table.TICKETS}`)
    //     await db.close()
    //     return NextResponse.json(tickets)
    // } catch (error: any) {
    //     await db.close()
    //     return NextResponse.json(error.message)
    // }
    const res = await fetch(`${process.env.END_POINT}/tickets`)
    const ticket: TTicket = await res.json()
    return NextResponse.json(ticket, { status: 200 })
}

export const POST = async (request: NextRequest) => {
    const ticket: TTicket = await request.json()
    const error: any = {}
    if (!ticket.title) {
        error['title'] = 'title required'
    }
    if (!ticket.body) {
        error['body'] = 'body required'
    }
    if (!ticket.user_id) {
        error['user_id'] = 'user id required'
    }
    if (Object.keys(error).length !== 0) {
        return NextResponse.json({ errors: error, message: 'something went wrong', ok: false }, { status: 400 })
    }

    const db = await openDatabase()
    try {
        // const res = await fetch('https://jsonplaceholder.typicode.com/posts')
        // const data = await res.json()

        // await Promise.all(data.map(async (elem: any) => {
        //     await db.run(`INSERT INTO ${Table.TICKETS} (title, body, priority, user_id) VALUES (?, ?, ?, ?)`, [elem.title, elem.body, elem.priority ?? 'medium', elem.userId]);
        // }))
        // // const insert = await db.run(`INSERT INTO ${Table.TICKETS} (title, body, priority, user_id) VALUES (?, ?, ?, ?)`, [ticket.title, ticket.body, ticket.priority ?? Priority.MEDIUM, ticket.user_id]);
        // // const _ticket: TTicket | undefined = await db.get(`SELECT * FROM ${Table.TICKETS} where id = (?)`, [insert.lastID]);
        // // await db.close()
        const res = await fetch(process.env.END_POINT + '/tickets', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(ticket)
          })
          const data = await res.json()
        return NextResponse.json({ message: 'created with success', ticket: data, ok: true })
    } catch (error: any) {
        await db.close()
        return NextResponse.json({ message: error.message, ok: false }, { status: 400 })
    }

}

export const PUT = async (request: NextRequest) => {
    const _ticket: TTicket = await request.json()
    if (!_ticket.id) {
        return NextResponse.json({ error: 'id required' })
    }
    if (!_ticket.title) {
        return NextResponse.json({ error: 'title required' })
    }
    if (!_ticket.body) {
        return NextResponse.json({ error: 'body required' })
    }

    const db = await openDatabase()
    try {
        const _ticketExist: TTicket | undefined = await db.get(`SELECT * FROM ${Table.TICKETS} where id = (?)`, [_ticket.id]);
        if (!_ticketExist) {
            return NextResponse.json({ error: 'ticket not found' })
        }
        await db.run(`UPDATE ${Table.TICKETS} SET title = ?, body = ?, priority = ? WHERE id = ?`, [_ticket.title, _ticket.body, _ticket.priority ?? Priority.MEDIUM, _ticket.id]);
        const ticket: TTicket | undefined = await db.get(`SELECT * FROM ${Table.TICKETS} where id = (?)`, [_ticket.id]);
        await db.close()
        return NextResponse.json(ticket)
    } catch (error: any) {
        await db.close()
        return NextResponse.json(error.message)
    }
}