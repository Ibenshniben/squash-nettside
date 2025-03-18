import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Søm Squash - Squashklubb i Kristiansand',
  description: 'Bestill baner, bli medlem, og nyt de beste squash-fasilitetene hos Søm Squash Klubb',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="no">
      <body className={inter.className}>
        <header className="bg-white shadow-md">
          <nav className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <Link href="/" className="text-2xl font-bold text-blue-800">Søm Squash</Link>
              {/* Navigation links */}
              <div className="hidden md:flex space-x-6">
                <Link href="/" className="hover:text-blue-800 transition">Hjem</Link>
                <Link href="/about" className="hover:text-blue-800 transition">Om Oss</Link>
                <Link href="/membership" className="hover:text-blue-800 transition">Medlemskap</Link>
                <Link href="/agreements" className="hover:text-blue-800 transition">Avtaler</Link>
                <Link href="/availability" className="hover:text-blue-800 transition">Baneoversikt</Link>
                <Link href="/booking" className="hover:text-blue-800 transition">Bestill Bane</Link>
                <Link href="/contact" className="hover:text-blue-800 transition">Kontakt</Link>
              </div>
              <div className="md:hidden">
                {/* Mobile menu button - would need JavaScript to toggle */}
                <button className="text-gray-500 hover:text-blue-800">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </nav>
        </header>
        
        <main>
          {children}
        </main>
        
        <footer className="bg-gray-800 text-white">
          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4">Søm Squash</h3>
                <p>Den beste destinasjonen for squash-entusiaster.</p>
                <p className="mt-2">Haumyveien 39c</p>
                <p>Kristiansand, Norge</p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4">Åpningstider</h3>
                <p>Hverdager: 07:00 - 23:00</p>
                <p>Lørdag - Søndag: 09:00 - 22:00</p>
                <p className="font-bold mt-2">Åpent 365 dager i året!</p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4">Kontakt</h3>
                <p>Telefon: 913 72 666</p>
                <p>E-post: info@somsquash.no</p>
              </div>
            </div>
            <div className="border-t border-gray-700 mt-8 pt-8 text-center">
              <p>&copy; {new Date().getFullYear()} Søm Squash. Alle rettigheter reservert.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}