'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useSession, signOut } from 'next-auth/react'

// Add the hideLoginButton prop to your component
export default function Navbar({ hideLoginButton = true }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const { data: session, status } = useSession()
  
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (isDropdownOpen && !target.closest('.user-dropdown-container')) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isDropdownOpen])

  // Only render the user menu if hideLoginButton is false
  const renderUserMenu = () => {
    if (hideLoginButton) {
      return null;
    }

    return (
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
                  {(session.user?.name || session.user?.email || '?').charAt(0).toUpperCase()}
                </div>
                <span className="hidden sm:inline font-medium">{session.user?.name || session.user?.email || 'User'}</span>
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
              {/* Dropdown content */}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <nav className="bg-blue-800 text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold">Søm Squash</Link>
          
          {/* Navigation Links - Removed booking link */}
          <div className="hidden md:flex space-x-6">
            <Link href="/availability" className="hover:text-blue-200 transition">Baneoversikt</Link>
            <Link href="/membership" className="hover:text-blue-200 transition">Medlemskap</Link>
            <Link href="/about" className="hover:text-blue-200 transition">Om oss</Link>
            <Link href="/location" className="hover:text-blue-200 transition">Finn oss</Link>
            <Link href="/contact" className="hover:text-blue-200 transition">Kontakt</Link>
            {session?.user?.role === 'ADMIN' && (
              <Link href="/admin" className="hover:text-blue-200 transition">Admin</Link>
            )}
          </div>
          
          {/* User Menu - Only render if hideLoginButton is false */}
          {renderUserMenu()}
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white focus:outline-none">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Mobile Menu - Also removed booking link */}
        {isMenuOpen && (
          <div className="md:hidden py-4">
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