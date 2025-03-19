import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { PrismaClient } from '@prisma/client'
// Fix the import path - make sure it points to the auth.ts file directly
import { authOptions } from '../auth/[...nextauth]/auth'

const prisma = new PrismaClient()

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || !session.user) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      )
    }
    
    const bookings = await prisma.booking.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        date: 'asc',
      },
      select: {
        id: true,
        court: true,
        date: true,
        startTime: true,
        endTime: true,
      },
    })
    
    return NextResponse.json({ bookings })
  } catch (error) {
    console.error('Error fetching user bookings:', error)
    return NextResponse.json(
      { message: 'Failed to fetch bookings' },
      { status: 500 }
    )
  }
}