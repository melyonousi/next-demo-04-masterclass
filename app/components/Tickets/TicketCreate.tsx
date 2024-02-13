'use client'

import { Priority } from "@/app/enum/priority"
import { Action } from "@/app/models/Action"
import { TTicket } from "@/app/models/Ticket"
import { useRouter } from "next/navigation"
import { ChangeEvent, useReducer, useState } from "react"

export const reducer = (state: any, action: Action) => {
  switch (action.type) {
    case 'INPUT': return { ...state, [action.payload.field]: action.payload.value }

    default: return state
  }
}

const TicketCreate = () => {
  const router = useRouter()
  const ticket = { title: '', body: '', priority: Priority.LOW, user_id: '1', user_email: 'melyonousi@casetrue.com' }
  const [state, dispatch] = useReducer(reducer, ticket)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(false)

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    dispatch({
      type: 'INPUT',
      payload: {
        field: e.currentTarget.name,
        value: e.currentTarget.value
      }
    })
  }

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('/api/tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(state)
      })
      const data = await res.json()
      if (res.ok) {
        router.refresh()
        router.push('/tickets')
      } else {
        setMessage(data?.message)
      }
    } catch (error: any) {
      setMessage(error?.message)
    }
    setLoading(false)
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="mx-auto max-w-md px-5 w-full flex flex-col gap-2 py-8">
        {message && <div className="mb-2 text-red-500">{message}</div>}
        <div>
          <label htmlFor="title"></label>
          <input
            className={`w-full px-2 py-1.5 outline-none md:text-lg text-base rounded border border-transparent`}
            type="text"
            name="title"
            id="title"
            placeholder="title"
            value={state.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="body"></label>
          <textarea
            className={`resize-y min-h-36 max-h-60 h-full w-full px-2 py-1.5 outline-none md:text-lg text-base rounded border border-transparent`}
            name="body"
            id="body"
            maxLength={5000}
            placeholder="body"
            value={state.body}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="priority"></label>
          <select
            className={`w-full px-2 py-1.5 outline-none md:text-lg text-base rounded border border-transparent`}
            name="priority" id="priority"
            value={state.priority}
            onChange={handleChange}>
            <option value={Priority.LOW}>{Priority.LOW}</option>
            <option value={Priority.MEDIUM}>{Priority.MEDIUM}</option>
            <option value={Priority.HIGH}>{Priority.HIGH}</option>
          </select>
        </div>
        <div>
          <button
            disabled={loading}
            className="dark:bg-zinc-800 bg-zinc-700 rounded w-fit py-1.5 px-2
              hover:bg-opacity-50
              disabled:bg-opacity-100
            disabled:text-zinc-600">
            {loading ? 'Creating...' : 'Create'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default TicketCreate
