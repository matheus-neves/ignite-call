import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const data = await request.json()

  const { name, username } = data

  const user = await prisma.user.create({
    data: {
      name,
      username,
    },
  })

  return NextResponse.json(user, { status: 201 })
}
