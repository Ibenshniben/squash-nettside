import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';
export const revalidate = 0;
export const runtime = 'nodejs';

// GET a specific booking
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    const bookingId = params.id;

    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
    });

    if (!booking) {
      return NextResponse.json({ message: 'Booking not found' }, { status: 404 });
    }

    // Check if user is admin or the booking owner
    if (session.user.role !== 'ADMIN' && booking.userId !== session.user.id) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    return NextResponse.json({ booking });
  } catch (error) {
    console.error('Error fetching booking:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

// DELETE a booking
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const bookingId = params.id;

    // First, get the booking to check ownership
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
    });

    if (!booking) {
      return NextResponse.json({ message: 'Booking not found' }, { status: 404 });
    }

    // Check if user is admin or the booking owner
    if (session.user.role !== 'ADMIN' && booking.userId !== session.user.id) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    // Delete the booking
    const deletedBooking = await prisma.booking.delete({
      where: { id: bookingId },
    });

    return NextResponse.json({ booking: deletedBooking });
  } catch (error) {
    console.error('Error deleting booking:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}