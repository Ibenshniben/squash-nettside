'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useSession, signOut } from 'next-auth/react'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const { data: session, status } = useSession()
  
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isDropdownOpen && !event.target.closest('.user-dropdown-container')) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isDropdownOpen])

  return (
    <nav className="bg-blue-800 text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold">Søm Squash</Link>
          
          {/* Navigation Links */}
          <div className="hidden md:flex space-x-6">
            <Link href="/booking" className="hover:text-blue-200 transition">Booking</Link>
            <Link href="/availability" className="hover:text-blue-200 transition">Baneoversikt</Link>
            <Link href="/membership" className="hover:text-blue-200 transition">Medlemskap</Link>
            <Link href="/about" className="hover:text-blue-200 transition">Om oss</Link>
            <Link href="/location" className="hover:text-blue-200 transition">Finn oss</Link>
            <Link href="/contact" className="hover:text-blue-200 transition">Kontakt</Link>
            {session?.user?.role === 'ADMIN' && (
              <Link href="/admin" className="hover:text-blue-200 transition">Admin</Link>
            )}
          </div>
          
          {/* User Menu */}
          <div className="flex items-center space-x-4">
            <div className="relative user-dropdown-container">
              <button 
                onClick={toggleDropdown}
                className="flex items-center space-x-2 bg-blue-700 hover:bg-blue-600 transition px-3 py-2 rounded-md"
                aria-expanded={isDropdownOpen}
                aria-haspopup="true"
              >
                {status === 'authenticated' ? (
                  <>
                    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
                      {session.user.name ? session.user.name.charAt(0).toUpperCase() : session.user.email.charAt(0).toUpperCase()}
                    </div>
                    <span className="hidden sm:inline font-medium">{session.user.name || session.user.email}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span className="hidden sm:inline">Logg inn</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </>
                )}
              </button>
              
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white text-gray-800 rounded-md shadow-lg py-1 z-10 border border-gray-200 transform transition-all duration-200 ease-in-out">
                  {status === 'authenticated' ? (
                    <>
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900 truncate">{session.user.name || 'Bruker'}</p>
                        <p className="text-xs text-gray-500 truncate">{session.user.email}</p>
                        {session.user.role === 'ADMIN' && (
                          <span className="mt-1 inline-block px-2 py-0.5 text-xs font-medium bg-purple-100 text-purple-800 rounded-full">
                            Administrator
                          </span>
                        )}
                      </div>
                      <Link href="/profile" className="flex items-center px-4 py-2 hover:bg-gray-100 text-sm" onClick={() => setIsDropdownOpen(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        Min profil
                      </Link>
                      <Link href="/my-bookings" className="flex items-center px-4 py-2 hover:bg-gray-100 text-sm" onClick={() => setIsDropdownOpen(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Mine reservasjoner
                      </Link>
                      {session?.user?.role === 'ADMIN' && (
                        <Link href="/admin" className="flex items-center px-4 py-2 hover:bg-gray-100 text-sm" onClick={() => setIsDropdownOpen(false)}>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          Admin Dashboard
                        </Link>
                      )}
                      <div className="border-t border-gray-100 mt-1">
                        <button 
                          onClick={() => {
                            setIsDropdownOpen(false);
                            signOut({ callbackUrl: '/' });
                          }}
                          className="flex items-center w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-red-600"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                          </svg>
                          Logg ut
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <Link href="/login" className="flex items-center px-4 py-2 hover:bg-gray-100 text-sm" onClick={() => setIsDropdownOpen(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                        </svg>
                        Logg inn
                      </Link>
                      <Link href="/register" className="flex items-center px-4 py-2 hover:bg-gray-100 text-sm" onClick={() => setIsDropdownOpen(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                        </svg>
                        Registrer
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white focus:outline-none">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4">
            <Link href="/booking" className="block py-2 hover:text-blue-200">Booking</Link>
            <Link href="/availability" className="block py-2 hover:text-blue-200">Baneoversikt</Link>
            <Link href="/membership" className="block py-2 hover:text-blue-200">Medlemskap</Link>
            <Link href="/about" className="block py-2 hover:text-blue-200">Om oss</Link>
            <Link href="/location" className="block py-2 hover:text-blue-200">Finn oss</Link>
            <Link href="/contact" className="block py-2 hover:text-blue-200">Kontakt</Link>
            {session?.user?.role === 'ADMIN' && (
              <Link href="/admin" className="block py-2 hover:text-blue-200">Admin</Link>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}