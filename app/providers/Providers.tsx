'use client'
import { ChakraProvider } from '@chakra-ui/react'
import { SessionProvider } from 'next-auth/react'
import React from 'react'
import UserProvider from './UserProvider'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ChakraProvider>
        <UserProvider>{children}</UserProvider>
      </ChakraProvider>
    </SessionProvider>
  )
}
