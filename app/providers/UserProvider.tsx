'use client'
import { Links, User } from '@prisma/client'
import { useSession } from 'next-auth/react'
import {
  Dispatch,
  SetStateAction,
  createContext,
  useCallback,
  useEffect,
  useState,
} from 'react'

export interface ILinks extends Links {
  _count: { clicks: number }
}

interface IUser extends User {
  links: ILinks[]
}

export const SetUserContext = createContext<
  Dispatch<SetStateAction<IUser | null>>
>(() => {})
export const UserContext = createContext<IUser | null>(null)
export const RefreshUserContext = createContext<{
  refreshUser: boolean
  setRefreshUser: Dispatch<SetStateAction<boolean>>
}>({
  refreshUser: false,
  setRefreshUser: () => {},
})

export default function UserProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [user, setUser] = useState<IUser | null>(null)
  const [refreshUser, setRefreshUser] = useState<boolean>(false)
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
  }, [getUser, refreshUser])

  return (
    <UserContext.Provider value={user}>
      <SetUserContext.Provider value={setUser}>
        <RefreshUserContext.Provider value={{ refreshUser, setRefreshUser }}>
          {children}
        </RefreshUserContext.Provider>
      </SetUserContext.Provider>
    </UserContext.Provider>
  )
}
