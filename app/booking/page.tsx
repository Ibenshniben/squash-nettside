'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Booking() {
  const [date, setDate] = useState('')
  const [court, setCourt] = useState('1')
  const [time, setTime] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  
  const router = useRouter()
  
  // Check if user is logged in
  useEffect(() => {
    // In a real app, you would verify the authentication token with your backend
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true'
    const userEmail = localStorage.getItem('userEmail')
    
    setIsLoggedIn(loggedIn)
    if (loggedIn && userEmail) {
      setEmail(userEmail)
    }
    
    setIsLoading(false)
  }, [])
  
  // Available time slots
  const timeSlots = [
    '07:00', '08:00', '09:00', '10:00', '11:00', '12:00',
    '13:00', '14:00', '15:00', '16:00', '17:00', '18:00',
    '19:00', '20:00', '21:00'
  ]
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Here you would typically send the booking data to your backend
    alert(`Bestilling bekreftet!\n\nBane: ${court}\nDato: ${date}\nTid: ${time}\nNavn: ${name}`)
    
    // Reset form
    setDate('')
    setCourt('1')
    setTime('')
    setName('')
    setPhone('')
    
    // Redirect to availability page to see updated bookings
    router.push('/availability')
  }
  
  // Show loading state
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p>Laster inn...</p>
      </div>
    )
  }
  
  // If user is not logged in, show login requirement
  if (!isLoggedIn) {
    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8 text-center">Bestill Bane</h1>
        
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
          <div className="text-center mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-blue-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <h2 className="text-2xl font-bold mt-4">Medlemsinnlogging kreves</h2>
            <p className="mt-2 text-gray-600">Du må være innlogget som medlem for å bestille bane.</p>
          </div>
          
          <div className="space-y-4">
            <Link href="/login" className="block w-full bg-blue-800 text-white text-center py-2 px-4 rounded-md hover:bg-blue-700 transition">
              Logg inn
            </Link>
            <Link href="/membership" className="block w-full bg-green-600 text-white text-center py-2 px-4 rounded-md hover:bg-green-700 transition">
              Bli medlem
            </Link>
            <Link href="/availability" className="block w-full text-blue-800 text-center py-2 px-4 border border-blue-800 rounded-md hover:bg-blue-50 transition">
              Se baneoversikt
            </Link>
          </div>
        </div>
      </div>
    )
  }
  
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">Bestill Bane</h1>
      
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="date" className="block text-gray-700 font-bold mb-2">Dato</label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              min={new Date().toISOString().split('T')[0]}
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="court" className="block text-gray-700 font-bold mb-2">Velg Bane</label>
            <select
              id="court"
              value={court}
              onChange={(e) => setCourt(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="1">Bane 1</option>
              <option value="2">Bane 2</option>
              <option value="3">Bane 3</option>
            </select>
          </div>
          
          <div className="mb-6">
            <label htmlFor="time" className="block text-gray-700 font-bold mb-2">Velg Tid</label>
            <select
              id="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Velg tid</option>
              {timeSlots.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
          
          <div className="mb-6">
            <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Navn</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">E-post</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              readOnly
            />
            <p className="text-sm text-gray-500 mt-1">E-post fra din medlemsprofil</p>
          </div>
          
          <div className="mb-6">
            <label htmlFor="phone" className="block text-gray-700 font-bold mb-2">Telefon</label>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-800 text-white px-6 py-3 rounded-lg font-bold text-lg hover:bg-blue-700 transition"
            >
              Bekreft Bestilling
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}