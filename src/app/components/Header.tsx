import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-blue-700 text-white">
      <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          Søm Squash
        </Link>
        <div className="space-x-6">
          <Link href="/booking" className="hover:text-gray-200">
            Booking
          </Link>
          <Link href="/baneoversikt" className="hover:text-gray-200">
            Baneoversikt
          </Link>
          <Link href="/medlemskap" className="hover:text-gray-200">
            Medlemskap
          </Link>
          <Link href="/om-oss" className="hover:text-gray-200">
            Om oss
          </Link>
          <Link href="/finn-oss" className="hover:text-gray-200">
            Finn oss
          </Link>
          <Link href="/kontakt" className="hover:text-gray-200">
            Kontakt
          </Link>
          {/* Login button removed */}
        </div>
      </nav>
    </header>
  );
}