'use client'

import { Avatar, Heading, Text } from '@ignite-ui/react'
import { Container, UserHeader } from './styles'

interface ScheduleProps {
  user: {
    name: string
    bio: string | null
    avatarUrl: string | null
  }
}

export default function Schedule({ user }: ScheduleProps) {
  return (
    <Container>
      <UserHeader>
        <Avatar src={user?.avatarUrl as string | undefined} />
        <Heading>{user?.name}</Heading>
        <Text>{user?.bio}</Text>
      </UserHeader>
    </Container>
  )
}
