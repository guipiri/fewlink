'use client'
import { Links, User } from '@prisma/client'
import { useSession } from 'next-auth/react'
import { createContext, useCallback, useEffect, useState } from 'react'

interface ILinks extends Links {
  _count: { clicks: number }
}

interface IUser extends User {
  links: ILinks[]
}

export const UserContext = createContext<IUser | null>(null)

export default function UserProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [user, setUser] = useState<IUser | null>(null)
  const { data } = useSession()

  const getUser = useCallback(async () => {
    if (data) {
      const res = await fetch(`/api/user?email=${data?.user?.email}`)
      const user: IUser = await res.json()
      setUser(user)
    }
  }, [data])

  useEffect(() => {
    getUser()
  }, [getUser])

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>
}
