'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  
  const router = useRouter()
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)
    
    try {
      // In a real application, you would make an API call to authenticate
      // For demo purposes, we'll simulate a successful login with any credentials
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Store login state in localStorage or a more secure method in production
      localStorage.setItem('isLoggedIn', 'true')
      localStorage.setItem('userEmail', email)
      
      // Redirect to booking page
      router.push('/booking')
    } catch (err) {
      setError('Innlogging mislyktes. Vennligst prøv igjen.')
    } finally {
      setIsLoading(false)
    }
  }
  
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">Medlemsinnlogging</h1>
      
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
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
            <label htmlFor="password" className="block text-gray-700 font-bold mb-2">Passord</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="remember" className="ml-2 block text-gray-700">
                Husk meg
              </label>
            </div>
            
            <div>
              <Link href="/forgot-password" className="text-blue-600 hover:underline">
                Glemt passord?
              </Link>
            </div>
          </div>
          
          <div className="mb-6">
            <button
              type="submit"
              className="w-full bg-blue-800 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
              disabled={isLoading}
            >
              {isLoading ? 'Logger inn...' : 'Logg inn'}
            </button>
          </div>
        </form>
        
        <div className="text-center">
          <p className="text-gray-600">
            Ikke medlem ennå?{' '}
            <Link href="/membership" className="text-blue-600 hover:underline">
              Bli medlem
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}