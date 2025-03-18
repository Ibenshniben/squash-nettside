'use client'

import { useState } from 'react'

export default function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', { name, email, message })
    
    // Show success message
    setSubmitted(true)
    
    // Reset form
    setName('')
    setEmail('')
    setMessage('')
  }
  
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">Kontakt Oss</h1>
      
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6">Send oss en melding</h2>
            
            {submitted ? (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                <p>Takk for din henvendelse! Vi vil kontakte deg så snart som mulig.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
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
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-gray-700 font-bold mb-2">Melding</label>
                  <textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={5}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="bg-blue-800 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition"
                >
                  Send Melding
                </button>
              </form>
            )}
          </div>
        </div>
        
        <div>
          <div className="bg-white p-8 rounded-lg shadow-md mb-8">
            <h2 className="text-2xl font-bold mb-6">Kontaktinformasjon</h2>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <svg className="h-6 w-6 text-blue-800 mr-3 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div>
                  <h3 className="font-bold">Adresse</h3>
                  <p>Haumyveien 39c</p>
                  <p>Kristiansand, Norge</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <svg className="h-6 w-6 text-blue-800 mr-3 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <div>
                  <h3 className="font-bold">Telefon</h3>
                  <p>913 72 666</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <svg className="h-6 w-6 text-blue-800 mr-3 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <div>
                  <h3 className="font-bold">E-post</h3>
                  <p>info@somsquash.no</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6">Åpningstider</h2>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="font-medium">Mandag - Fredag:</span>
                <span>07:00 - 23:00</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Lørdag:</span>
                <span>09:00 - 22:00</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Søndag:</span>
                <span>09:00 - 22:00</span>
              </div>
              <div className="pt-4 text-center font-bold text-blue-800">
                Åpent 365 dager i året!
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Map Section */}
      <div className="max-w-5xl mx-auto mt-12">
        <h2 className="text-2xl font-bold mb-6 text-center">Finn Oss</h2>
        
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="aspect-w-16 aspect-h-9 w-full h-[400px] bg-gray-200 rounded flex items-center justify-center">
            <div className="text-center p-4">
              <p className="text-gray-600 mb-2">Google Maps vil vises her</p>
              <p className="text-sm text-gray-500">For å implementere et faktisk kart, bruk Google Maps API eller en annen karttjeneste</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}