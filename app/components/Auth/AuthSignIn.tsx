'use client'

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation"
import { ChangeEvent, useReducer, useState } from "react"

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case 'CREATE': return { ...state, [action.field]: action.value }

    default: return state
  }
}

const AuthSignIn = () => {
  const router = useRouter()
  const user = { email: '', password: '' }
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [state, dispatch] = useReducer(reducer, user)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: 'CREATE',
      field: e.currentTarget.name,
      value: e.currentTarget.value
    })
  }

  const handleGithubSignIn = async () => {
    const supabase = createClientComponentClient()
    const { error, data } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${location.origin}/api/auth/callback`
      }
    })
    if (error) {
      setMessage(error?.message)
    }
  }

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    const supabase = createClientComponentClient()
    // const { error, data } = await supabase.auth.signInWithOAuth({
    //   provider: 'github',
    //   options: {
    //     redirectTo: `${location.origin}/api/auth/callback`
    //   }
    // })
    const { error } = await supabase.auth.signInWithPassword({
      email: state.email,
      password: state.password
    })
    if (error) {
      setMessage(error?.message)
    } else {
      router.push('/profile')
    }
    setLoading(false)
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="mx-auto max-w-md px-5 w-full flex flex-col gap-2 py-8">
        {message && <div className="mb-2 text-red-500">{message}</div>}
        <div>
          <label htmlFor="email"></label>
          <input
            className={`w-full px-2 py-1.5 outline-none md:text-lg text-base rounded border border-transparent`}
            type="email"
            name="email"
            id="email"
            placeholder="email"
            value={state.email}
            autoComplete="email"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password"></label>
          <input
            className={`w-full px-2 py-1.5 outline-none md:text-lg text-base rounded border border-transparent`}
            type="password"
            name="password"
            id="password"
            placeholder="password"
            autoComplete="new-password"
            value={state.password}
            onChange={handleChange}
          />
        </div>
        <div>
          <button
            disabled={loading}
            className="dark:bg-zinc-800 bg-zinc-700 rounded w-fit py-1.5 px-2
              hover:bg-opacity-50
              disabled:bg-opacity-100
            disabled:text-zinc-600">
            {loading ? 'Signin...' : 'Signin'}
          </button>
        </div>
      </form>
      <div className="mx-auto max-w-md px-5 w-full flex flex-col gap-2">
        <button
          onClick={handleGithubSignIn}
          disabled={loading}
          className="dark:bg-zinc-800 bg-zinc-700 rounded w-fit py-1.5 px-2
              hover:bg-opacity-50
              disabled:bg-opacity-100
            disabled:text-zinc-600">
          {loading ? 'Sign in with Github...' : 'Sign in with Github'}
        </button>
      </div>
    </div>
  )
}

export default AuthSignIn
