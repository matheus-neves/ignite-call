import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

export async function PUT(request: Request) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({
      status: 401,
      statusText: 'You must be logged in..',
    })
  }

  const bio = await request.json()

  await prisma.user.update({
    where: {
      id: session.user.id,
    },
    data: {
      bio,
    },
  })

  return NextResponse.json({ status: 204 })
}
