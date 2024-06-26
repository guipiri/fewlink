'use client'
import { Button, FormControl, Input } from '@chakra-ui/react'
import { Links } from '@prisma/client'
import { ChangeEvent, useContext, useState } from 'react'
import { RefreshUserContext, UserContext } from '../providers/UserProvider'
import { IResponse } from '../types/IResponse'

const initialStateLink: Omit<Links, 'createdAt' | 'updatedAt' | 'id'> = {
  redirectTo: '',
  slug: '',
  userId: '',
}

export default function CreateLinkForm() {
  const user = useContext(UserContext)
  const { refreshUser, setRefreshUser } = useContext(RefreshUserContext)

  const [link, setLink] =
    useState<Omit<Links, 'createdAt' | 'updatedAt' | 'id'>>(initialStateLink)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLink({ ...link, [e.target.name]: e.target.value })
  }

  const createLink = async () => {
    const res = await fetch('/api/link', {
      method: 'POST',
      body: JSON.stringify({ ...link, userId: user?.id }),
    })
    const { message }: IResponse = await res.json()
    setLink(initialStateLink)
    alert(message)
    return setRefreshUser(!refreshUser)
  }

  return (
    <form action={createLink} className="w-full">
      <FormControl className="flex">
        {/* <Box className="flex items-center">
          <Text fontSize="2xl">fewl.ink/</Text>
          <Input
            onChange={handleChange}
            className="ml-2"
            type="text"
            id="slug"
            name="slug"
            required
            value={link.slug}
          />
        </Box> */}
        {/* <FormLabel className="mt-4" htmlFor="redirectTo">
          Redirecionar para:
        </FormLabel> */}
        <Input
          onChange={handleChange}
          type="url"
          id="redirectTo"
          name="redirectTo"
          placeholder="URL a ser encurtada..."
          value={link.redirectTo}
        />
        <Button ml="1rem" type="submit">
          +
        </Button>
      </FormControl>
    </form>
  )
}
