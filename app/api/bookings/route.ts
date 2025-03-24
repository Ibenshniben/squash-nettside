import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';
import { getServerSession } from 'next-auth/next';  // Updated import
import { authOptions } from '@/lib/auth';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';
export const revalidate = 0;
export const runtime = 'nodejs';  // Added runtime specification

// GET bookings for a specific date
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const date = searchParams.get('date');

    if (!date) {
      return NextResponse.json(
        { message: 'Date parameter is required' },
        { status: 400 }
      );
    }

    const bookings = await prisma.booking.findMany({
      where: { date },
      orderBy: [
        { court: 'asc' },
        { startTime: 'asc' }
      ]
    });

    return NextResponse.json({ bookings });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json(
      { message: 'Failed to fetch bookings' },
      { status: 500 }
    );
  }
}

// Create a new booking
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { court, date, startTime, endTime } = await request.json();

    if (!court || !date || !startTime || !endTime) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    const existingBooking = await prisma.booking.findFirst({
      where: {
        date,
        court,
        startTime
      }
    });

    if (existingBooking) {
      return NextResponse.json(
        { message: 'This time slot is already booked' },
        { status: 409 }
      );
    }

    const booking = await prisma.booking.create({
      data: {
        court,
        date,
        startTime,
        endTime,
        userId: session.user.id
      }
    });

    return NextResponse.json({ booking }, { status: 201 });
  } catch (error) {
    console.error('Error creating booking:', error);
    return NextResponse.json(
      { message: 'Failed to create booking' },
      { status: 500 }
    );
  }
}