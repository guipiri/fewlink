import { getServerSession } from 'next-auth'
import Image from 'next/image'
import LinkShortnerForms from './components/LinkShortnerForms'

export default async function Home() {
  const session = await getServerSession()

  return (
    <div className="flex items-center flex-col">
      <div>
        <h1>Olá {session?.user?.name}</h1>
        <Image
          src={session?.user?.image || ''}
          alt="profile-image"
          width={50}
          height={50}
        />
        <LinkShortnerForms />
      </div>
    </div>
  )
}
