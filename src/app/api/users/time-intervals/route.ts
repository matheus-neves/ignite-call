import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { z } from 'zod'

const timeIntervalsBodySchema = z.array(
  z.object({
    weekDay: z.number(),
    startTimeInMinutes: z.number(),
    endTimeInMinutes: z.number(),
  }),
)

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({
      status: 401,
      statusText: 'You must be logged in..',
    })
  }

  const data = await request.json()

  console.log(typeof data)

  const intervals = timeIntervalsBodySchema.parse(data)

  await Promise.all(
    intervals.map((interval) => {
      return prisma.userTimeInterval.create({
        data: {
          week_day: interval.weekDay,
          time_start_in_minutes: interval.startTimeInMinutes,
          time_end_in_minutes: interval.endTimeInMinutes,
          user_id: session.user?.id,
        },
      })
    }),
  )

  return NextResponse.json({ status: 201 })
}
