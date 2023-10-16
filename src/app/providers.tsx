'use client'

import { queryClient } from '@/lib/react-query'
import { QueryClientProvider } from '@tanstack/react-query'
import { SessionProvider } from 'next-auth/react'

interface NextAuthProviderProps {
  children?: React.ReactNode
}

export const NextAuthProvider = ({ children }: NextAuthProviderProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>{children}</SessionProvider>
    </QueryClientProvider>
  )
}
