import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers"
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";

export const GET = async (request: NextRequest) => {
    const url = new URL(request.url)
    const code = url.searchParams.get('code')

    if (code) {
        const supabase = createRouteHandlerClient({ cookies })
        const { error, data } = await supabase.auth.exchangeCodeForSession(code)
        if (error) {
            return NextResponse.json('something wrong', { status: 404 })
        }
        return NextResponse.redirect(url.origin + '/profile')
    } else {
        return NextResponse.json('code not found', { status: 404 })
    }
}