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

  const date = `${year}-${String(month).padStart(2, '0')}`

  const blockedDatesRaw: Array<{ date: number }> = await prisma.$queryRaw`
    SELECT * 
      EXTRACT(DAY FROM S.date) AS date,
      COUNT(S.date) AS amount
      ((UTI.time_end_in_minutes - UTI.time_start_in_minutes) / 60) AS size

    FROM schedulings S

    LEFT JOIN user_time_intervals UTI
      ON UTI.week_day = WEEKDAY(DATE_ADD(S.date, INTERVAL 1 DAY))

    WHERE S.user_id = ${user.id}
      AND DATE_FORMAT(S.date, "%Y-$m") = ${date}

    GROUP BY EXTRACT(DAY FROM S.date),
      ((UTI.time_end_in_minutes - UTI.time_start_in_minutes) / 60)
    
    HAVING amount >= size
  `

  const blockedDates = blockedDatesRaw.map((item) => item.date)

  return NextResponse.json({ blockedWeekDays, blockedDates })
}
