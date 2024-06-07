'use client'
import { User } from '@prisma/client'
import { useSession } from 'next-auth/react'
import { createContext, useCallback, useEffect, useState } from 'react'

export const UserContext = createContext<User | null>(null)

export default function UserProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [user, setUser] = useState<User | null>(null)
  const { data } = useSession()

  const getUser = useCallback(async () => {
    if (data) {
      const res = await fetch(`/api/user?userEmail=${data?.user?.email}`)
      const user = await res.json()
      setUser(user)
    }
  }, [data])

  useEffect(() => {
    getUser()
  }, [getUser])

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>
}
