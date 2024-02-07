import { TUser } from "./User"

export type TTicket = {
    id: string
    title: string
    body: string
    priority: string
    user_id?: string
    user_email?: string
    user?: TUser
}