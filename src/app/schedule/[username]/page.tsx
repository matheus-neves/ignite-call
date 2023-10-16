import { notFound } from 'next/navigation'
import SchedulePage from './page/index'
import { prisma } from '@/lib/prisma'
import type { Metadata } from 'next'

type Props = {
  params: { username: string }
}

export const revalidate = 60 * 60 * 24 // 1 day

export async function generateStaticParams() {
  return []
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: `Agendar com ${params.username}`,
  }
}

async function getUserByUsername(username: string) {
  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  })

  if (!user) return null

  return {
    user: {
      name: user.name,
      bio: user?.bio,
      avatarUrl: user?.avatar_url,
    },
  }
}

export default async function UpdateProfile({ params }: Props) {
  const data = await getUserByUsername(params.username)

  if (!data?.user) return notFound()

  return <SchedulePage user={data.user} />
}
