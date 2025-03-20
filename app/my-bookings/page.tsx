'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

// Add this interface at the top of the file, after the imports
interface Booking {
  id: string;
  date: string;
  court: string;
  startTime: string;
  endTime: string;
}

export default function MyBookings() {
  const { data: session, status } = useSession()
  const router = useRouter()
  // Update the state definition with the Booking type
  const [bookings, setBookings] = useState<Booking[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    // Redirect if not logged in
    if (status === 'unauthenticated') {
      router.push('/login?callbackUrl=/my-bookings')
    }
    
    if (status === 'authenticated') {
      fetchMyBookings()
    }
  }, [status, router])

  const fetchMyBookings = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/my-bookings')
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch bookings')
      }
      
      setBookings(data.bookings)
    } catch (error) {
      console.error('Error fetching bookings:', error)
      setError('Kunne ikke hente dine reservasjoner. Vennligst prøv igjen.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancelBooking = async (bookingId: string) => {
    if (!confirm('Er du sikker på at du vil kansellere denne reservasjonen?')) {
      return
    }
    
    try {
      setIsLoading(true)
      const response = await fetch(`/api/bookings/${bookingId}`, {
        method: 'DELETE',
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to cancel booking')
      }
      
      // Remove the cancelled booking from the list
      setBookings(bookings.filter(booking => booking.id !== bookingId))
    } catch (error) {
      console.error('Error cancelling booking:', error)
      setError('Kunne ikke kansellere reservasjonen. Vennligst prøv igjen.')
    } finally {
      setIsLoading(false)
    }
  }

  if (status === 'loading' || isLoading) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p>Laster...</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">Mine Reservasjoner</h1>
      
      {!session ? (
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md text-center">
          <p className="mb-4">Du må være logget inn for å se dine reservasjoner.</p>
          <Link 
            href="/login?callbackUrl=/my-bookings" 
            className="bg-blue-800 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition inline-block"
          >
            Logg inn
          </Link>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto">
          {error && (
            <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-md">
              {error}
            </div>
          )}
          
          {bookings.length === 0 ? (
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <p className="mb-4">Du har ingen reservasjoner.</p>
              <Link 
                href="/booking" 
                className="bg-blue-800 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition inline-block"
              >
                Bestill bane
              </Link>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Dato
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Bane
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tid
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Handling
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {bookings.map((booking) => {
                    // Format date for display
                    const dateObj = new Date(booking.date)
                    const formattedDate = dateObj.toLocaleDateString('nb-NO', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })
                    
                    // Check if booking is in the future
                    const now = new Date()
                    const bookingDateTime = new Date(`${booking.date}T${booking.startTime}`)
                    const isInFuture = bookingDateTime > now
                    
                    return (
                      <tr key={booking.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formattedDate}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          Bane {booking.court}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {booking.startTime} - {booking.endTime}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          {isInFuture && (
                            <button
                              onClick={() => handleCancelBooking(booking.id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              Kanseller
                            </button>
                          )}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
          
          <div className="mt-8">
            <Link href="/booking" className="text-blue-800 hover:underline">
              Bestill ny bane
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}