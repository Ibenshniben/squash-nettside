import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-blue-800 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">Søm Squash</h3>
            <p className="mb-4">Haumyveien 39c<br />Kristiansand, Norge</p>
            <p>Tlf: 913 72 666<br />E-post: info@somsquash.no</p>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Åpningstider</h3>
            <p className="mb-2">Mandag - Fredag: 07:00 - 23:00</p>
            <p className="mb-2">Lørdag: 09:00 - 22:00</p>
            <p>Søndag: 09:00 - 22:00</p>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Lenker</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="hover:underline">Om Oss</Link></li>
              <li><Link href="/membership" className="hover:underline">Medlemskap</Link></li>
              <li><Link href="/booking" className="hover:underline">Booking</Link></li>
              <li><Link href="/contact" className="hover:underline">Kontakt</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-blue-700 text-center">
          <p>&copy; {new Date().getFullYear()} Søm Squash. Alle rettigheter reservert.</p>
        </div>
      </div>
    </footer>
  )
}