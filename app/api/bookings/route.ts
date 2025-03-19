import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
// Update this import to use the auth.ts file directly
import { authOptions } from '../auth/[...nextauth]/auth'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { court, date, startTime, endTime } = await request.json()

    // Validate input
    if (!court || !date || !startTime || !endTime) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 })
    }

    // Check for existing bookings at the same time and court
    const existingBooking = await prisma.booking.findFirst({
      where: {
        court,
        date,
        startTime,
      },
    })

    if (existingBooking) {
      return NextResponse.json({ message: 'This court is already booked for the selected time' }, { status: 409 })
    }

    // Create booking
    const booking = await prisma.booking.create({
      data: {
        court,
        date,
        startTime,
        endTime,
        userId: session.user.id,
      },
    })

    return NextResponse.json({ booking }, { status: 201 })
  } catch (error) {
    console.error('Error creating booking:', error)
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  // Get the session
  const session = await getServerSession(authOptions)
  
  // Check if user is authenticated
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }
  
  try {
    // Get date from query params if provided
    const url = new URL(request.url)
    const date = url.searchParams.get('date')
    
    // Build the query
    const query: any = {}
    
    // Add date filter if provided
    if (date) {
      query.date = date
    }
    
    // For admin users, return all bookings for the date
    // For regular users, return only their bookings or public booking info
    const bookings = await prisma.booking.findMany({
      where: query,
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        startTime: 'asc',
      },
    })

    return NextResponse.json({ bookings })
  } catch (error) {
    console.error('Error fetching bookings:', error)
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}