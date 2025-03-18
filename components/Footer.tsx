import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4 text-blue-300">Søm Squash</h3>
            <p className="mb-4">Haumyveien 39c<br />4637 Kristiansand</p>
            <p>Tlf: 913 72 666<br />E-post: eyvind@somsquash.no</p>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4 text-blue-300">Åpningstider</h3>
            <p className="mb-2">Mandag - Fredag: 07:00 - 23:00</p>
            <p className="mb-2">Lørdag: 09:00 - 22:00</p>
            <p>Søndag: 09:00 - 22:00</p>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4 text-blue-300">Lenker</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="hover:text-white hover:underline transition-colors">Om Oss</Link></li>
              <li><Link href="/availability" className="hover:text-white hover:underline transition-colors">Baneoversikt</Link></li>
              <li><Link href="/membership" className="hover:text-white hover:underline transition-colors">Medlemskap</Link></li>
              <li><Link href="/booking" className="hover:text-white hover:underline transition-colors">Booking</Link></li>
              <li><Link href="/contact" className="hover:text-white hover:underline transition-colors">Kontakt</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p>&copy; {new Date().getFullYear()} Søm Squash. Alle rettigheter reservert.</p>
        </div>
      </div>
    </footer>
  )
}