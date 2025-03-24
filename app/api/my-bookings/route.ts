import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { PrismaClient } from '@prisma/client'
// Fix the import path to match your project structure
import { authOptions } from '@/lib/auth' // or the correct path to your auth options

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