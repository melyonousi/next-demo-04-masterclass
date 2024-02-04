import { Table } from "@/app/enum/tables"
import { TTicket } from "@/app/models/Ticket"
import { openDatabase } from "@/db/database"
import { NextApiRequest } from "next"
import { NextRequest, NextResponse } from "next/server"

export const GET = async (request: NextApiRequest) => {
    const db = await openDatabase()
    try {
        const tickets: Array<TTicket> = await db.all(`SELECT * FROM ${Table.TICKETS}`)
        await db.close()
        return NextResponse.json(tickets)
    } catch (error: any) {
        await db.close()
        return NextResponse.json(error.message)
    }
}

export const POST = async (request: NextRequest) => {
    const ticket: TTicket = await request.json()
    if (!ticket.title) {
        return NextResponse.json({ error: 'title required' })
    }
    if (!ticket.body) {
        return NextResponse.json({ error: 'body required' })
    }
    if (!ticket.user_id) {
        return NextResponse.json({ error: 'user id required' })
    }

    const db = await openDatabase()
    try {
        // const res = await fetch('https://jsonplaceholder.typicode.com/posts')
        // const data = await res.json()

        // await Promise.all(data.map(async (elem: any) => {
        //     await db.run(`INSERT INTO ${Table.TICKETS} (title, body, priority, user_id) VALUES (?, ?, ?, ?)`, [elem.title, elem.body, elem.priority ?? 'medium', elem.userId]);
        // }))
        const insert = await db.run(`INSERT INTO ${Table.TICKETS} (title, body, priority, user_id) VALUES (?, ?, ?, ?)`, [ticket.title, ticket.body, ticket.priority ?? 'medium', ticket.user_id]);
        const _ticket: TTicket | undefined = await db.get(`SELECT * FROM ${Table.TICKETS} where id = (?)`, [insert.lastID]);
        await db.close()
        return NextResponse.json({ ticket: _ticket })
    } catch (error: any) {
        await db.close()
        return NextResponse.json(error.message)
    }

}

export const PUT = async (request: NextRequest) => {
    const ticket: TTicket = await request.json()
    if (!ticket.id) {
        return NextResponse.json({ error: 'id required' })
    }
    if (!ticket.title) {
        return NextResponse.json({ error: 'title required' })
    }
    if (!ticket.body) {
        return NextResponse.json({ error: 'body required' })
    }

    const db = await openDatabase()
    try {
        const _ticket: TTicket | undefined = await db.get(`SELECT * FROM ${Table.TICKETS} where id = (?)`, [ticket.id]);
        if (_ticket) {
            return NextResponse.json({ error: 'ticket not found' })
        }
        await db.run(`UPDATE ${Table.TICKETS} SET title = ?, body = ?, priority = ? WHERE id = ?`, [ticket.title, ticket.body, ticket.priority ?? 'medium', ticket.id]);
        await db.close()
        return NextResponse.json({ _ticket })
    } catch (error: any) {
        await db.close()
        return NextResponse.json(error.message)
    }
}