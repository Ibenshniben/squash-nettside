import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { PrismaClient } from '@prisma/client'
// Update this import to use the auth.ts file directly
import { authOptions } from '../../auth/[...nextauth]/auth'

const prisma = new PrismaClient()

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || !session.user || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      )
    }
    
    const bookings = await prisma.booking.findMany({
      orderBy: [
        { date: 'asc' },
        { startTime: 'asc' }
      ],
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    })
    
    return NextResponse.json({ bookings })
  } catch (error) {
    console.error('Error fetching all bookings:', error)
    return NextResponse.json(
      { message: 'Failed to fetch bookings' },
      { status: 500 }
    )
  }
}