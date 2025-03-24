import { NextResponse } from 'next/server';

// Mock storage for bookings
const bookings = new Map();

export async function POST(request: Request) {
  try {
    const { court, date, startTime, name, email } = await request.json();

    // Validate input
    if (!court || !date || !startTime || !name || !email) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if timeslot is available
    const bookingKey = `${date}-${court}-${startTime}`;
    if (bookings.has(bookingKey)) {
      return NextResponse.json(
        { message: 'This time slot is already booked' },
        { status: 409 }
      );
    }

    // Store booking
    const booking = {
      id: Date.now().toString(),
      court,
      date,
      startTime,
      name,
      email,
      createdAt: new Date().toISOString(),
    };

    bookings.set(bookingKey, booking);

    return NextResponse.json({ booking });
  } catch (error) {
    console.error('Error creating booking:', error);
    return NextResponse.json(
      { message: 'Failed to create booking' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date');

    if (!date) {
      return NextResponse.json(
        { message: 'Date parameter is required' },
        { status: 400 }
      );
    }

    // Filter bookings by date
    const dateBookings = Array.from(bookings.values()).filter(
      (booking: any) => booking.date === date
    );

    return NextResponse.json({ bookings: dateBookings });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json(
      { message: 'Failed to fetch bookings' },
      { status: 500 }
    );
  }
}