import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      {/* Hero Section */}
      <div className="w-full bg-blue-800 text-white relative">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/squash-bane.jpg" 
            alt="Søm Squash bane" 
            fill 
            style={{objectFit: 'cover', opacity: '0.4'}}
            priority
          />
        </div>
        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Søm Squash</h1>
          <p className="text-xl md:text-2xl mb-8">Den beste squash-fasiliteten i regionen</p>
          <Link href="/booking" className="bg-white text-blue-800 px-6 py-3 rounded-lg font-bold text-lg hover:bg-gray-100 transition">
            Bestill Bane
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Hvorfor velge Søm Squash?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4">3 Profesjonelle Baner</h3>
            <p>Vårt anlegg har tre profesjonelle baner som vedlikeholdes etter høyeste standard.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4">Enkel Bestilling</h3>
            <p>Bestill bane når som helst, hvor som helst med vårt enkle og praktiske bestillingssystem.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4">Medlemsfordeler</h3>
            <p>Bli med i klubben vår for å nyte rabatterte priser, prioritert bestilling og eksklusive arrangementer.</p>
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="w-full bg-gray-100 py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Klar til å spille?</h2>
          <p className="text-xl mb-8">Bli med oss i dag og opplev de beste squash-fasilitetene i byen.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/membership" className="bg-blue-800 text-white px-6 py-3 rounded-lg font-bold text-lg hover:bg-blue-700 transition">
              Bli Medlem
            </Link>
            <Link href="/booking" className="bg-green-600 text-white px-6 py-3 rounded-lg font-bold text-lg hover:bg-green-700 transition">
              Bestill Bane
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}