import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
} from '@chakra-ui/react'
import { getServerSession } from 'next-auth'

export default async function LinkShortnerForms() {
  const session = await getServerSession()
  const createLink = async (formData: FormData) => {
    'use server'
    console.log(session)
    // const slug = formData.get('slug')?.toString()
    // const redirectTo = formData.get('redirectTo')?.toString()
    // if (!(slug && redirectTo)) return alert('campos vazios')
    // await prisma.links.create({ data: { slug, redirectTo, userId: 1 } })
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
