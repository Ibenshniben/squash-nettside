import Link from 'next/link'

export default function Membership() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">Medlemskap</h1>
      
      <div className="max-w-4xl mx-auto mb-12">
        <p className="text-xl text-center mb-8">
          Bli medlem i Søm Squash og få tilgang til førsteklasses fasiliteter og eksklusive fordeler.
        </p>
      </div>
      
      {/* Membership Plans Section - now first */}
      <div className="max-w-6xl mx-auto mb-16">
        <h2 className="text-2xl font-bold mb-8 text-center">Medlemskapsavtaler</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* STANDARD Plan */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
            <div className="bg-gray-100 p-6 text-center">
              <h3 className="text-xl font-bold">STANDARD</h3>
              <p className="text-2xl font-bold mt-2">249 kr<span className="text-sm font-normal">/mnd</span></p>
            </div>
            <div className="p-6">
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>12 mnd. bindingstid</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Ubegrenset spilletid sammen med andre med avtale</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Etablering kr 200</span>
                </li>
              </ul>
              <Link href="/contact" className="block text-center bg-blue-800 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition">
                Registrer
              </Link>
            </div>
          </div>
          
          {/* FAMILIE Plan */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden border border-blue-800">
            <div className="bg-blue-800 text-white p-6 text-center">
              <h3 className="text-xl font-bold">FAMILIE</h3>
              <p className="text-2xl font-bold mt-2">349 kr<span className="text-sm font-normal">/mnd</span></p>
            </div>
            <div className="p-6">
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>12 mnd. bindingstid</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Ubegrenset spilletid sammen med familien eller andre med avtale</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Etablering kr 200</span>
                </li>
              </ul>
              <Link href="/contact" className="block text-center bg-blue-800 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition">
                Registrer
              </Link>
            </div>
          </div>
          
          {/* STUDENT/JUNIOR Plan */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
            <div className="bg-gray-100 p-6 text-center">
              <h3 className="text-xl font-bold">STUDENT/JUNIOR</h3>
              <p className="text-2xl font-bold mt-2">199 kr<span className="text-sm font-normal">/mnd</span></p>
            </div>
            <div className="p-6">
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>12 mnd. bindingstid</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Ubegrenset spilletid</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Etablering kr 200</span>
                </li>
              </ul>
              <Link href="/contact" className="block text-center bg-blue-800 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition">
                Registrer
              </Link>
            </div>
          </div>
          
          {/* ENKELTMÅNED Plan */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-800">
            <div className="bg-gray-800 text-white p-6 text-center">
              <h3 className="text-xl font-bold">ENKELTMÅNED</h3>
              <p className="text-2xl font-bold mt-2">500 kr<span className="text-sm font-normal">/mnd</span></p>
            </div>
            <div className="p-6">
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Velg antall måneder</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Familie kr 700</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Etablering kr 100</span>
                </li>
              </ul>
              <Link href="/contact" className="block text-center bg-blue-800 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition">
                Registrer
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Member Benefits Section - moved to here */}
      <div className="max-w-5xl mx-auto mb-16">
        <h2 className="text-2xl font-bold mb-8 text-center">Medlemsfordeler</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="w-16 h-16 bg-blue-800 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4 mx-auto">1</div>
            <h3 className="text-xl font-bold mb-3 text-center">Rabatterte Priser</h3>
            <p className="text-center">Nyt betydelige rabatter på baneleie sammenlignet med ikke-medlemmer.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="w-16 h-16 bg-blue-800 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4 mx-auto">2</div>
            <h3 className="text-xl font-bold mb-3 text-center">Prioritert Booking</h3>
            <p className="text-center">Medlemmer kan bestille baner opptil to uker i forveien, før de åpnes for allmennheten.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="w-16 h-16 bg-blue-800 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4 mx-auto">3</div>
            <h3 className="text-xl font-bold mb-3 text-center">Eksklusive Arrangementer</h3>
            <p className="text-center">Delta på medlemsturneringer, sosiale sammenkomster og spesielle arrangementer.</p>
          </div>
        </div>
      </div>
      
      {/* FAQ Section and Call to Action remain unchanged */}
    </div>
  )
}