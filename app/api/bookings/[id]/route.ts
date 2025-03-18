import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { PrismaClient } from '@prisma/client';
import { authOptions } from '../../auth/[...nextauth]/route';

const prisma = new PrismaClient();

// Delete booking (admin or booking owner)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const bookingId = params.id;

  try {
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