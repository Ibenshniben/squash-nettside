import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { PrismaClient } from '@prisma/client';
// Update this import
import { authOptions } from '../../../auth/[...nextauth]/auth';

const prisma = new PrismaClient();

// Update user role (admin only)
export async function PATCH(
  request: NextRequest,
  context: any
) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== 'ADMIN') {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const userId = context.params.id;
  const { role } = await request.json();

  if (!userId || !role || !['ADMIN', 'USER'].includes(role)) {
    return NextResponse.json({ message: 'Invalid request' }, { status: 400 });
  }

  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { role },
    });

    return NextResponse.json({ user: updatedUser });
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

// Delete user (admin only)
export async function DELETE(
  request: NextRequest,
  context: any
) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== 'ADMIN') {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const userId = context.params.id;

  if (!userId) {
    return NextResponse.json({ message: 'Invalid request' }, { status: 400 });
  }

  try {
    // Delete the user (cascade will delete their bookings too)
    const deletedUser = await prisma.user.delete({
      where: { id: userId },
    });

    return NextResponse.json({ user: deletedUser });
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}