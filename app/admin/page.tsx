'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

// Update the import to use the auth.ts file directly
import { authOptions } from '../api/auth/[...nextauth]/auth'

// Define interfaces for type safety
interface User {
  id: string;
  name: string | null;
  email: string | null;
  role: string;
}

interface Booking {
  id: string;
  court: string;
  date: string;
  startTime: string;
  endTime: string;
  user?: {
    id: string;
    name: string | null;
    email: string | null;
  };
}

export default function AdminDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [users, setUsers] = useState<User[]>([])
  const [bookings, setBookings] = useState<Booking[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('bookings')
  const [error, setError] = useState('')

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
      return
    }

    if (session?.user?.role !== 'ADMIN') {
      router.push('/')
      return
    }

    fetchData()
  }, [session, status, router])

  const fetchData = async () => {
    try {
      setIsLoading(true)
      await Promise.all([fetchAllBookings(), fetchAllUsers()])
    } catch (error) {
      console.error('Error fetching data:', error)
      setError('Kunne ikke hente data. Vennligst prøv igjen.')
    } finally {
      setIsLoading(false)
    }
  }

  const fetchAllBookings = async () => {
    try {
      const response = await fetch('/api/admin/bookings')
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch bookings')
      }
      
      setBookings(data.bookings || [])
    } catch (error) {
      console.error('Error fetching bookings:', error)
      throw error
    }
  }

  const fetchAllUsers = async () => {
    try {
      const response = await fetch('/api/admin/users')
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch users')
      }
      
      setUsers(data.users || [])
    } catch (error) {
      console.error('Error fetching users:', error)
      throw error
    }
  }

  const handleDeleteBooking = async (bookingId: string) => {
    if (!confirm('Er du sikker på at du vil slette denne reservasjonen?')) {
      return
    }
    
    try {
      const response = await fetch(`/api/bookings/${bookingId}`, {
        method: 'DELETE',
      })
      
      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.message || 'Failed to delete booking')
      }
      
      // Remove the deleted booking from the list
      setBookings(bookings.filter(booking => booking.id !== bookingId))
    } catch (error) {
      console.error('Error deleting booking:', error)
      setError('Kunne ikke slette reservasjonen. Vennligst prøv igjen.')
    }
  }

  // Fix the TypeScript error by adding type annotations
  const handleToggleUserRole = async (userId: string, currentRole: string) => {
    const newRole = currentRole === 'ADMIN' ? 'USER' : 'ADMIN'
    
    if (!confirm(`Er du sikker på at du vil endre brukerens rolle til ${newRole}?`)) {
      return
    }
    
    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ role: newRole }),
      })
      
      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.message || 'Failed to update user role')
      }
      
      // Update the user in the list
      setUsers(users.map(user => 
        user.id === userId ? { ...user, role: newRole } : user
      ))
    } catch (error) {
      console.error('Error updating user role:', error)
      setError('Kunne ikke oppdatere brukerrolle. Vennligst prøv igjen.')
    }
  }

  const handleDeleteUser = async (userId) => {
    if (!confirm('Er du sikker på at du vil slette denne brukeren? Alle reservasjoner for denne brukeren vil også bli slettet.')) {
      return
    }
    
    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: 'DELETE',
      })
      
      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.message || 'Failed to delete user')
      }
      
      // Remove the deleted user from the list
      setUsers(users.filter(user => user.id !== userId))
      // Also remove any bookings by this user
      setBookings(bookings.filter(booking => booking.userId !== userId))
    } catch (error) {
      console.error('Error deleting user:', error)
      setError('Kunne ikke slette brukeren. Vennligst prøv igjen.')
    }
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8 text-center">Admin Dashboard</h1>
        <div className="text-center">Laster...</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">Admin Dashboard</h1>
      
      {error && (
        <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}
      
      <div className="mb-8">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex">
            <button
              onClick={() => setActiveTab('bookings')}
              className={`py-4 px-6 font-medium text-sm ${
                activeTab === 'bookings'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Reservasjoner
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`py-4 px-6 font-medium text-sm ${
                activeTab === 'users'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Brukere
            </button>
          </nav>
        </div>
      </div>
      
      {activeTab === 'bookings' && (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bane</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dato</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tid</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bruker</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Handlinger</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              // For the type error on line 92, you need to check if bookings exists and is an array
              // Find the section where you're mapping over bookings and add a check:
              
              {bookings && bookings.length > 0 ? (
                bookings.map((booking) => (
                  <tr key={booking.id}>
                    {/* Your booking row content */}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-4">No bookings found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
      
      {activeTab === 'users' && (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Navn</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">E-post</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rolle</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Handlinger</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.length > 0 ? (
                users.map((user) => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{user.name || 'Ikke angitt'}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.role === 'ADMIN' ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'
                      }`}>
                        {user.role === 'ADMIN' ? 'Admin' : 'Bruker'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button 
                        onClick={() => handleToggleUserRole(user.id, user.role)}
                        className="text-blue-600 hover:text-blue-900 mr-4"
                      >
                        {user.role === 'ADMIN' ? 'Gjør til bruker' : 'Gjør til admin'}
                      </button>
                      <button 
                        onClick={() => handleDeleteUser(user.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Slett
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                    Ingen brukere funnet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}