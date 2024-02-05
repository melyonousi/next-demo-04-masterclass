import { Table } from "@/app/enum/tables";
import { TTicket } from "@/app/models/Ticket";
import { openDatabase } from "@/db/database";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest, { params }: { params: { id: string } }, response: NextResponse) => {
    const db = await openDatabase()

    // const ticket: TTicket | undefined = await db.get(`SELECT * FROM ${Table.TICKETS} where id = (?)`, [params.id]);
    const select = await db.get(`
                    SELECT t.*, u.*
                    FROM ${Table.TICKETS} AS t
                    INNER JOIN ${Table.USERS} AS u ON t.user_id = u.id
                    WHERE t.id = ?
                `, params.id);

    if (!select) {
        await db.close()
        return NextResponse.json({error: 'ticket not found'})
    }

    const ticket: TTicket = {
        id: select.id,
        title: select.title,
        body: select.body,
        priority: select.priority,
        user: {
            id: select?.user_id,
            name: select?.name,
            email: select?.email,
        }
    }

    await db.close()
    return NextResponse.json(ticket)
}

export const DELETE = async (request: NextRequest, { params }: { params: { id: string } }, response: NextResponse) => {
    const db = await openDatabase()

    const ticket: TTicket | undefined = await db.get(`SELECT * FROM ${Table.TICKETS} where id = (?)`, [params.id]);

    if (ticket) {
        await db.run(`DELETE FROM ${Table.TICKETS} WHERE id = (?)`, [params.id]);

        await db.close()
        return NextResponse.json({ ticket, success: 'deleted with success' })
    }

    await db.close()
    return NextResponse.json({ error: 'ticket not found' })

}