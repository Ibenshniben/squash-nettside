import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';

// Define an interface for the user type
interface MockUser {
  id: string;
  name: string;
  email: string;
}

// Define the type for the mockUsers object
interface MockUsers {
  [key: string]: MockUser;
}

// Mock user data with proper typing
const mockUsers: MockUsers = {
  '1': { id: '1', name: 'John Doe', email: 'john@example.com' },
  '2': { id: '2', name: 'Jane Smith', email: 'jane@example.com' }
};

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const userId = params.id;
  const user = mockUsers[userId];

  if (!user) {
    return NextResponse.json({ message: 'User not found' }, { status: 404 });
  }

  return NextResponse.json({ user });
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const userId = params.id;
  if (!mockUsers[userId]) {
    return NextResponse.json({ message: 'User not found' }, { status: 404 });
  }

  try {
    const data = await request.json();
    mockUsers[userId] = { ...mockUsers[userId], ...data };
    return NextResponse.json({ user: mockUsers[userId] });
  } catch (error) {
    return NextResponse.json({ message: 'Invalid request' }, { status: 400 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const userId = params.id;
  if (!mockUsers[userId]) {
    return NextResponse.json({ message: 'User not found' }, { status: 404 });
  }

  delete mockUsers[userId];
  return NextResponse.json({ message: 'User deleted successfully' });
}