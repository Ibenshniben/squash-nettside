'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Booking() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedCourt, setSelectedCourt] = useState('1')
  const [selectedTime, setSelectedTime] = useState('')
  const [bookings, setBookings] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  // Available time slots
  const timeSlots = [
    '07:00', '08:00', '09:00', '10:00', '11:00', '12:00',
    '13:00', '14:00', '15:00', '16:00', '17:00', '18:00',
    '19:00', '20:00', '21:00', '22:00'
  ]

  // Set today's date as default
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0]
    setSelectedDate(today)
    
    // Redirect if not logged in
    if (status === 'unauthenticated') {
      router.push('/login?callbackUrl=/booking')
    }
  }, [status, router])

  // Fetch bookings when date changes
  useEffect(() => {
    if (selectedDate) {
      fetchBookings()
    }
  }, [selectedDate])

  const fetchBookings = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(`/api/bookings?date=${selectedDate}`)
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch bookings')
      }
      
      setBookings(data.bookings)
    } catch (error) {
      console.error('Error fetching bookings:', error)
      setError('Kunne ikke hente reservasjoner. Vennligst prøv igjen.')
    } finally {
      setIsLoading(false)
    }
  }

  const isTimeSlotBooked = (court, time) => {
    return bookings.some(booking => 
      booking.court === court && 
      booking.startTime === time
    )
  }

  const handleBooking = async (e) => {
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
      
      {!session ? (
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md text-center">
          <p className="mb-4">Du må være logget inn for å bestille bane.</p>
          <Link 
            href="/login?callbackUrl=/booking" 
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
          
          {success && (
            <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-md">
              {success}
            </div>
          )}
          
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-2xl font-bold mb-4">Velg dato og bane</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="date" className="block text-gray-700 font-bold mb-2">Dato</label>
                <input 
                  type="date" 
                  id="date" 
                  value={selectedDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label htmlFor="court" className="block text-gray-700 font-bold mb-2">Bane</label>
                <select 
                  id="court" 
                  value={selectedCourt}
                  onChange={(e) => setSelectedCourt(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="1">Bane 1</option>
                  <option value="2">Bane 2</option>
                  <option value="3">Bane 3</option>
                </select>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Velg tid</h2>
            
            {isLoading ? (
              <p className="text-center py-4">Laster tilgjengelige tider...</p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {timeSlots.map((time) => {
                  const isBooked = isTimeSlotBooked(selectedCourt, time)
                  return (
                    <button
                      key={time}
                      onClick={() => !isBooked && setSelectedTime(time)}
                      className={`py-2 px-4 rounded-md text-center ${
                        isBooked 
                          ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                          : selectedTime === time
                            ? 'bg-blue-800 text-white'
                            : 'bg-white border border-gray-300 hover:bg-gray-50'
                      }`}
                      disabled={isBooked}
                    >
                      {time}
                      {isBooked && <span className="block text-xs mt-1">(Opptatt)</span>}
                    </button>
                  )
                })}
              </div>
            )}
            
            {selectedTime && (
              <div className="mt-8 text-center">
                <p className="mb-4">
                  Du har valgt <strong>Bane {selectedCourt}</strong> den <strong>{selectedDate}</strong> kl. <strong>{selectedTime}</strong>
                </p>
                <button
                  onClick={handleBooking}
                  disabled={isLoading}
                  className="bg-blue-800 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition disabled:opacity-70"
                >
                  {isLoading ? 'Behandler...' : 'Bestill bane'}
                </button>
              </div>
            )}
          </div>
          
          <div className="mt-8">
            <Link href="/my-bookings" className="text-blue-800 hover:underline">
              Se mine reservasjoner
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}


// In your booking form submission handler:
const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);
  setError('');

  try {
    const response = await fetch('/api/bookings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        court,
        date,
        startTime,
        endTime,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to create booking');
    }

    setSuccess('Reservasjon opprettet!');
    // Reset form or redirect
    router.push('/my-bookings');
  } catch (error) {
    console.error('Error creating booking:', error);
    setError('Kunne ikke opprette reservasjon. Vennligst prøv igjen.');
  } finally {
    setIsSubmitting(false);
  }
};