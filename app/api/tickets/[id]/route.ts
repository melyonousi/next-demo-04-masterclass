import { Table } from "@/app/enum/tables";
import { TTicket } from "@/app/models/Ticket";
import { openDatabase } from "@/db/database";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest, { params }: { params: { id: string } }, response: NextResponse) => {
    const db = await openDatabase()

    const ticket: TTicket | undefined = await db.get(`SELECT * FROM ${Table.TICKETS} where id = (?)`, [params.id]);

    await db.close()

    return NextResponse.json({ ticket })
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