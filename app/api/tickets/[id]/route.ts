import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic'

export const DELETE = async (_: any, { params }: { params: { id: string } }) => {
    const supabase = createRouteHandlerClient({ cookies })
    const { error } = await supabase.from('Tickets').delete().eq('id', params.id)
    if (error) {
        return NextResponse.json({ message: error.message, ok: false }, { status: 404, statusText: error.message })
    }
    else {
        return NextResponse.json({ message: 'success', ok: true }, { status: 200 })
    }
}