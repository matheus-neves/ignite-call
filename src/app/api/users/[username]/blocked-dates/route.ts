/* eslint-disable camelcase */
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  context: { params: { username: string } },
) {
  const url = new URL(request.url)

  const year = url.searchParams.get('year')
  const month = url.searchParams.get('month')

  if (!year || !month) {
    return NextResponse.json({
      status: 400,
      statusText: 'Year or month not specified.',
    })
  }

  const username = context.params.username

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  })

  if (!user) {
    return NextResponse.json({
      status: 400,
      statusText: 'User does not exist.',
    })
  }

  const availableWeekDays = await prisma.userTimeInterval.findMany({
    select: {
      week_day: true,
    },
    where: {
      user_id: user.id,
    },
  })

  const blockedWeekDays = [0, 1, 2, 3, 4, 5, 6].filter((weekDay) => {
    return !availableWeekDays.some(
      (availableWeekDay) => availableWeekDay.week_day === weekDay,
    )
  })

  return NextResponse.json({ blockedWeekDays })
}
