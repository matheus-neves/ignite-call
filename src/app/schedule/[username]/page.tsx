import { notFound } from 'next/navigation'
import SchedulePage from './page/index'
import { prisma } from '@/lib/prisma'

export const revalidate = 60 * 60 * 24 // 1 day

export async function generateStaticParams() {
  return []
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

interface UpdateProfile {
  params: {
    username: string
  }
}

export default async function UpdateProfile({ params }: UpdateProfile) {
  const data = await getUserByUsername(params.username)

  if (!data?.user) return notFound()

  return <SchedulePage user={data.user} />
}
