import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
} from '@chakra-ui/react'
import { getServerSession } from 'next-auth'
import { prisma } from '../lib/prisma'

export default async function LinkShortnerForms() {
  const session = await getServerSession()

  const createLink = async (formData: FormData) => {
    'use server'
    if (!session) return console.log(session)

    const slug = formData.get('slug')?.toString()
    const redirectTo = formData.get('redirectTo')?.toString()
    if (!(slug && redirectTo)) return false
    const user = await prisma.user.findUnique({
      where: { email: session?.user?.email || undefined },
    })
    await prisma.links.create({
      data: {
        slug,
        redirectTo,
        userId: user?.id || '',
      },
    })
  }

  return (
    <form action={createLink}>
      <FormControl className="flex flex-col max-w-96">
        <Box className="flex items-center">
          <Text fontSize="2xl">fewl.ink/</Text>
          <Input className="ml-2" type="text" id="slug" name="slug" required />
        </Box>
        <FormLabel className="mt-4" htmlFor="redirectTo">
          Redirecionar para:
        </FormLabel>
        <Input type="url" id="redirectTo" name="redirectTo" required />
        <Button className="mt-6" type="submit">
          Criar Link
        </Button>
      </FormControl>
    </form>
  )
}
