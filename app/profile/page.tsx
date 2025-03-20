'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function Profile() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    }
    
    if (session?.user) {
      setName(session.user.name || '')
      setEmail(session.user.email || '')
    }
  }, [session, status, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage('')

    try {
      const response = await fetch('/api/user/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to update profile')
      }

      setMessage('Profil oppdatert!')
    } catch (error) {
      console.error('Error updating profile:', error)
      setMessage('Kunne ikke oppdatere profil. Vennligst prøv igjen.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (status === 'loading') {
    return <div className="container mx-auto px-4 py-12 text-center">Laster...</div>
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">Min profil</h1>
      
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Navn</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">E-post</label>
            <input
              type="email"
              id="email"
              value={email}
              disabled
              className="w-full px-4 py-2 border rounded-md bg-gray-100"
            />
            <p className="text-sm text-gray-500 mt-1">E-post kan ikke endres</p>
          </div>
          
          {message && (
            <div className={`mb-4 p-3 rounded ${message.includes('ikke') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
              {message}
            </div>
          )}
          
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {isSubmitting ? 'Oppdaterer...' : 'Oppdater profil'}
          </button>
        </form>
        
        <div className="mt-8 pt-6 border-t">
          <h2 className="text-xl font-semibold mb-4">Kontoopplysninger</h2>
          <p className="text-gray-700 mb-2"><span className="font-medium">Rolle:</span> {session?.user?.role === 'ADMIN' ? 'Administrator' : 'Bruker'}</p>
          <p className="text-gray-700"><span className="font-medium">Medlem siden:</span> {new Date().toLocaleDateString('no-NO')}</p>
        </div>
      </div>
    </div>
  )
}