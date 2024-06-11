'use client'
import { Button, Flex } from '@chakra-ui/react'
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
    <>
      <Flex alignItems="center" justifyContent="space-between" margin="1rem">
        {user && (
          <Image
            src={user?.image || ''}
            alt="profile-image"
            width={50}
            height={50}
            className="mr-4"
          />
        )}
        <CreateLinkForm />
        <Button
          ml="1rem"
          onClick={() => (user ? signOut() : router.push('/api/auth/signin'))}
        >
          {user ? 'Logout' : 'Login'}
        </Button>
      </Flex>
      {user?.links && user?.links.length > 0 && <Dashboard />}
    </>
  )
}
