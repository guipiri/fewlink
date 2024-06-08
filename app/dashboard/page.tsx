'use client'

import { useContext } from 'react'
import { UserContext } from '../providers/UserProvider'

export default function Dashboard() {
  const user = useContext(UserContext)
  console.log(user)

  return <div>page</div>
}
