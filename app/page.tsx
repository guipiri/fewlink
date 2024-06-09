'use client'
import { Button } from '@chakra-ui/react'
import { signOut } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useContext } from 'react'
import CreateLinkForm from './components/CreateLinkForm'
import Dashboard from './dashboard/page'
import { UserContext } from './providers/UserProvider'

export default function Home() {
  const user = useContext(UserContext)
  const router = useRouter()
  return (
    <div className="w-full flex flex-col items-center">
      <div className="max-w-2xl w-full">
        <nav className="flex justify-between mb-8">
          {user && (
            <>
              <Image
                src={user?.image || ''}
                alt="profile-image"
                width={50}
                height={50}
              />
              <h1>Olá {user?.name}</h1>
            </>
          )}
          <Button
            onClick={() => (user ? signOut() : router.push('/api/auth/signin'))}
          >
            {user ? 'Logout' : 'Login'}
          </Button>
        </nav>
        <CreateLinkForm />
        {user?.links && user?.links.length > 0 && <Dashboard />}
      </div>
    </div>
  )
}
