import { NextApiRequest, NextApiResponse } from 'next'
import { NextRequest, NextResponse } from 'next/server'
import { openDatabase } from '@/db/database'
import { Table } from '@/app/enum/tables'
import bcrypt from 'bcrypt'
import { TUser } from '@/app/models/User'

export const GET = async (req: NextApiRequest, res: NextApiResponse) => {
  const db = await openDatabase()

  try {
    const users: Array<TUser> = await db.all('SELECT id, name, email FROM users')
    await db.close()
    return NextResponse.json({ users })
  } catch (error: any) {
    await db.close()
    return NextResponse.json(error.message)
  }
}

export const POST = async (req: NextRequest) => {
  const db = await openDatabase()

  try {
    // const res = await fetch('https://jsonplaceholder.typicode.com/users')
    // const data = await res.json()

    // await Promise.all(data.map(async (elem: any) => {
    //   const salt = await bcrypt.genSalt(10)
    //   const hash = await bcrypt.hash('Pa$$w0rd!', salt)
    //   await db.run(`INSERT INTO ${Table.USERS} (name, email, password) VALUES (?, ?, ?)`, [elem.name, elem.email, hash]);
    // }))
    const user: TUser = await req.json()
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(user.password, salt)
    const insert = await db.run(`INSERT INTO ${Table.USERS} (name, email, password) VALUES (?, ?, ?)`, [user.name, user.email, hash])
    const _user: TUser | undefined = await db.get(`SELECT name, email FROM ${Table.USERS} where id = ?`, insert.lastID)
    await db.close()
    return NextResponse.json({ user: _user })
  } catch (error: any) {
    await db.close()
    return NextResponse.json(error.message)
  }
}