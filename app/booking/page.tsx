'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface Booking {
  id: string;
  court: string;
  date: string;
  startTime: string;
  endTime: string;
}

export default function BookingPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedCourt, setSelectedCourt] = useState('1')
  const [selectedTime, setSelectedTime] = useState('')
  const [bookings, setBookings] = useState<Booking[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('') // Add this line
  const [isAuthorized, setIsAuthorized] = useState(false)
  
  // Set today's date as default
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0]
    setSelectedDate(today)
    
    // Check if user is authenticated
    if (status === 'authenticated') {
      setIsAuthorized(true)
    }
  }, [status])
  
  // Debug function properly defined inside component
  const debugSession = () => {
    if (process.env.NODE_ENV !== 'production') {
      console.log('Session:', session)
      console.log('Status:', status)
      return (
        <div className="bg-gray-100 p-4 mb-4 rounded">
          <h3 className="font-bold">Debug Session Info:</h3>
          <pre className="text-xs mt-2 overflow-auto">
            {JSON.stringify(session, null, 2)}
          </pre>
          <p>Status: {status}</p>
        </div>
      )
    }
    return null
  }
  
  const isTimeSlotBooked = (court: string, time: string) => {
    return bookings.some(booking => 
      booking.court === court && 
      booking.startTime === time
    )
  }

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!selectedDate || !selectedCourt || !selectedTime) {
      setError('Vennligst velg dato, bane og tid')
      return
    }

    try {
      setIsLoading(true)
      setError('')
      setSuccess('')
      
      // Calculate end time (1 hour after start time)
      const [hours, minutes] = selectedTime.split(':')
      const endHour = parseInt(hours) + 1
      const endTime = `${endHour.toString().padStart(2, '0')}:${minutes}`
      
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date: selectedDate,
          court: selectedCourt,
          startTime: selectedTime,
          endTime: endTime,
        }),
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to create booking')
      }
      
      setSuccess('Banen er reservert!')
      fetchBookings() // Refresh bookings
      setSelectedTime('') // Reset selected time
    } catch (error) {
      console.error('Error creating booking:', error)
      setError(error.message || 'Kunne ikke reservere bane. Vennligst prøv igjen.')
    } finally {
      setIsLoading(false)
    }
  }

  if (status === 'loading') {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p>Laster...</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">Bestill Bane</h1>
      
      {/* Add debug session info */}
      {process.env.NODE_ENV !== 'production' && debugSession()}
      
      {!isAuthorized && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          Unauthorized
        </div>
      )}

      {success && (
        <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-md">
          {success}
        </div>
      )}
      
      {error && (
        <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}
      
      {isAuthorized && (
        // Your booking form components here
        <div>
          {/* Rest of your booking form */}
        </div>
      )}
    </div>
  )
}