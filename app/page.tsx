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
          <p className="text-xl md:text-2xl mb-8">Squashbaner i Kristiansand</p>
          <Link href="/booking" className="bg-white text-blue-800 px-6 py-3 rounded-lg font-bold text-lg hover:bg-gray-100 transition">
            Bestill Bane
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Vårt tilbud</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4">3 Squashbaner</h3>
            <p>Vi tilbyr tre squashbaner som er tilgjengelige for både medlemmer og drop-in spillere.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4">Enkel Bestilling</h3>
            <p>Bestill bane når som helst via vårt online bookingsystem eller kontakt oss direkte.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4">Fleksible Medlemskap</h3>
            <p>Vi tilbyr ulike medlemskapsalternativer tilpasset dine behov, fra enkeltmåneder til årlige avtaler.</p>
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="w-full bg-gray-100 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Kom i gang med squash</h2>
            <p className="text-lg mb-8">
              Enten du er nybegynner eller erfaren spiller, har vi et opplegg som passer for deg. 
              Sjekk tilgjengeligheten på banene våre eller bli medlem i dag.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/availability" className="bg-blue-800 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition">
                Se Baneoversikt
              </Link>
              <Link href="/membership" className="bg-transparent border-2 border-blue-800 text-blue-800 px-6 py-3 rounded-lg font-bold hover:bg-blue-50 transition">
                Bli Medlem
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Info Section */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Åpningstider</h2>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="mb-4">
                <p className="font-bold mb-2">Hverdager:</p>
                <p>07:00 - 23:00</p>
              </div>
              <div className="mb-4">
                <p className="font-bold mb-2">Lørdag:</p>
                <p>09:00 - 22:00</p>
              </div>
              <div>
                <p className="font-bold mb-2">Søndag:</p>
                <p>09:00 - 22:00</p>
              </div>
              <p className="mt-4 text-sm italic">
                Medlemmer har tilgang alle dager med adgangsbrikke
              </p>
            </div>
            
            <h2 className="text-3xl font-bold mb-6 mt-10">Kontakt</h2>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="font-bold mb-2">Eyvind Strømsvåg</p>
              <p className="mb-1">Telefon: 913 72 666</p>
              <p className="mb-4">E-post: eyvind@somsquash.no</p>
              <Link href="/contact" className="text-blue-800 hover:underline">
                Kontakt oss
              </Link>
            </div>
          </div>
          
          <div>
            <div className="aspect-w-16 aspect-h-9">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1066.5116632843197!2d8.0669129!3d58.1571044!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTjCsDA5JzI1LjYiTiA4wrAwNCcwMC45IkU!5e0!3m2!1sno!2sno!4v1623456789012!5m2!1sno!2sno&markers=color:red%7Clabel:S%7C58.1571044,8.0669129" 
                width="600" 
                height="450" 
                style={{border:0}} 
                allowFullScreen={true} 
                loading="lazy" 
                className="w-full h-96 rounded-lg shadow-md"
              ></iframe>
            </div>
            <div className="mt-4 bg-white p-6 rounded-lg shadow-md">
              <p className="font-bold mb-2">Adresse:</p>
              <p>Søm Squash<br />Haumyveien 39c<br />4637 Kristiansand</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}