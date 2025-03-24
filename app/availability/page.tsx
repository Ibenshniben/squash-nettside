'use client'

import { useState, useEffect } from 'react'

// Interface for booking data
interface Booking {
  id: string;
  court: string;
  date: string;
  startTime: string;
  endTime: string;
  name: string;
  email: string;
}

export default function Availability() {
  const [selectedDate, setSelectedDate] = useState('')
  const [bookings, setBookings] = useState<Booking[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  
  // Booking form state
  const [selectedCourt, setSelectedCourt] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [showBookingForm, setShowBookingForm] = useState(false)
  
  // Set today's date as default
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0]
    setSelectedDate(today)
    fetchBookings(today)
  }, [])
  
  // Available time slots
  const timeSlots = [
    '07:00', '08:00', '09:00', '10:00', '11:00', '12:00',
    '13:00', '14:00', '15:00', '16:00', '17:00', '18:00',
    '19:00', '20:00', '21:00', '22:00'
  ]
  
  // Fetch bookings from API
  const fetchBookings = async (date: string) => {
    try {
      setIsLoading(true)
      const response = await fetch(`/api/bookings?date=${date}`)
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch bookings')
      }
      
      setBookings(data.bookings || [])
    } catch (error) {
      console.error('Error fetching bookings:', error)
      setError('Kunne ikke hente reservasjoner. Vennligst prøv igjen.')
    } finally {
      setIsLoading(false)
    }
  }
  
  // Check if a court is booked at a specific time
  const isBooked = (court: string, time: string) => {
    return bookings.some(booking => 
      booking.court === court && 
      booking.startTime === time
    )
  }
  
  // Handle booking form submission
  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!selectedDate || !selectedCourt || !selectedTime || !name || !email) {
      setError('Vennligst fyll ut alle feltene')
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
          name: name,
          email: email
        }),
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to create booking')
      }
      
      setSuccess('Banen er reservert!')
      fetchBookings(selectedDate) // Refresh bookings
      setName('')
      setEmail('')
      setShowBookingForm(false) // Hide form after successful booking
    } catch (error) {
      console.error('Error creating booking:', error)
      setError(
        error instanceof Error 
          ? error.message 
          : 'Kunne ikke reservere bane. Vennligst prøv igjen.'
      )
    } finally {
      setIsLoading(false)
    }
  }
  
  // Open booking form for a specific court and time
  const openBookingForm = (court: string, time: string) => {
    setSelectedCourt(court)
    setSelectedTime(time)
    setShowBookingForm(true)
  }
  
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">Baneoversikt & Booking</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {success}
        </div>
      )}
      
      <div className="max-w-6xl mx-auto mb-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <div className="mb-4 md:mb-0">
            <label htmlFor="date" className="block text-gray-700 font-bold mb-2">Velg dato:</label>
            <input
              type="date"
              id="date"
              value={selectedDate}
              onChange={(e) => {
                setSelectedDate(e.target.value)
                fetchBookings(e.target.value)
              }}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              min={new Date().toISOString().split('T')[0]}
            />
          </div>
          
          <div>
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
                <span>Ledig</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-red-500 rounded-full mr-2"></div>
                <span>Opptatt</span>
              </div>
            </div>
          </div>
        </div>
        
        {isLoading ? (
          <div className="text-center py-8">Laster...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-3 px-4 border-b border-r text-left">Tid</th>
                  <th className="py-3 px-4 border-b border-r text-center">Bane 1</th>
                  <th className="py-3 px-4 border-b border-r text-center">Bane 2</th>
                  <th className="py-3 px-4 border-b text-center">Bane 3</th>
                </tr>
              </thead>
              <tbody>
                {timeSlots.map((time) => (
                  <tr key={time} className="border-b">
                    <td className="py-3 px-4 border-r font-medium">{time}</td>
                    {['1', '2', '3'].map((court) => {
                      const booked = isBooked(court, time)
                      return (
                        <td 
                          key={`${court}-${time}`} 
                          className={`py-3 px-4 border-r text-center ${booked ? 'bg-red-100' : 'bg-green-100'}`}
                        >
                          {booked ? (
                            <span className="text-red-600 font-medium">Opptatt</span>
                          ) : (
                            <div>
                              <span className="text-green-600 font-medium">Ledig</span>
                              <div className="mt-1">
                                <button 
                                  onClick={() => openBookingForm(court, time)}
                                  className="text-blue-600 hover:underline"
                                >
                                  Bestill
                                </button>
                              </div>
                            </div>
                          )}
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      
      {/* Booking Form Modal */}
      {showBookingForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Book Bane {selectedCourt}</h2>
            <p className="mb-4">Dato: {selectedDate}, Tid: {selectedTime}</p>
            
            <form onSubmit={handleBooking} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-gray-700 font-medium mb-1">Navn</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-gray-700 font-medium mb-1">E-post</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              
              <div className="flex justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowBookingForm(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100"
                >
                  Avbryt
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  disabled={isLoading}
                >
                  {isLoading ? 'Behandler...' : 'Bekreft booking'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}