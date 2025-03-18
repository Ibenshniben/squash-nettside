'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

// Mock booking data for demonstration
const mockBookings = [
  { id: 1, court: '1', date: '2024-06-01', startTime: '10:00', endTime: '11:00', name: 'Ole Hansen' },
  { id: 2, court: '2', date: '2024-06-01', startTime: '14:00', endTime: '15:00', name: 'Kari Olsen' },
  { id: 3, court: '3', date: '2024-06-01', startTime: '18:00', endTime: '19:00', name: 'Erik Johansen' },
  { id: 4, court: '1', date: '2024-06-02', startTime: '09:00', endTime: '10:00', name: 'Lisa Pedersen' },
]

export default function Availability() {
  const [selectedDate, setSelectedDate] = useState('')
  const [bookings, setBookings] = useState(mockBookings)
  
  // Set today's date as default
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0]
    setSelectedDate(today)
  }, [])
  
  // Available time slots
  const timeSlots = [
    '07:00', '08:00', '09:00', '10:00', '11:00', '12:00',
    '13:00', '14:00', '15:00', '16:00', '17:00', '18:00',
    '19:00', '20:00', '21:00', '22:00'
  ]
  
  // Filter bookings for selected date
  const filteredBookings = bookings.filter(booking => booking.date === selectedDate)
  
  // Check if a court is booked at a specific time
  const isBooked = (court: string, time: string) => {
    return filteredBookings.some(booking => 
      booking.court === court && 
      booking.startTime === time
    )
  }
  
  // Get booking details for a specific court and time
  const getBookingDetails = (court: string, time: string) => {
    return filteredBookings.find(booking => 
      booking.court === court && 
      booking.startTime === time
    )
  }
  
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">Baneoversikt</h1>
      
      <div className="max-w-6xl mx-auto mb-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <div className="mb-4 md:mb-0">
            <label htmlFor="date" className="block text-gray-700 font-bold mb-2">Velg dato:</label>
            <input
              type="date"
              id="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
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
                              <Link 
                                href="/booking" 
                                className="text-xs text-blue-600 hover:underline"
                              >
                                Bestill
                              </Link>
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
      </div>
      
      <div className="max-w-6xl mx-auto mt-12 text-center">
        <p className="mb-4">Ønsker du å bestille en bane?</p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/booking" className="bg-blue-800 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition">
            Bestill Bane
          </Link>
          <Link href="/membership" className="bg-transparent border-2 border-blue-800 text-blue-800 px-6 py-3 rounded-lg font-bold hover:bg-blue-50 transition">
            Se Medlemskap
          </Link>
        </div>
      </div>
    </div>
  )
}