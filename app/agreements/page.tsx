import Link from 'next/link'

export default function Agreements() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">Medlemskapsavtaler</h1>
      
      <div className="max-w-4xl mx-auto mb-12">
        <p className="text-xl text-center mb-8">
          Velg en avtale og spill så mye du vil for et fast månedlig beløp!
        </p>
        
        <div className="bg-blue-800 text-white p-6 rounded-lg mb-10">
          <h2 className="text-2xl font-bold mb-4 text-center">ÅPNINGSTIDER</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
            <div>
              <p className="font-semibold">Hverdager</p>
              <p>07:00 - 23:00</p>
            </div>
            <div>
              <p className="font-semibold">Lørdag og søndag</p>
              <p>09:00 - 22:00</p>
            </div>
          </div>
          <p className="text-center mt-4 font-bold">Åpent 365 dager i året!</p>
        </div>
      </div>
      
      <h2 className="text-2xl font-bold mb-6 text-center">AVTALEVALG</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        {/* Standard Agreement */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-gray-100 p-6 text-center">
            <h3 className="text-xl font-bold">STANDARD</h3>
            <p className="text-2xl font-bold mt-2">249 kr<span className="text-sm font-normal">/mnd</span></p>
          </div>
          <div className="p-6">
            <ul className="space-y-3">
              <li className="flex items-center">
                <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                12 mnd. bindingstid
              </li>
              <li className="flex items-center">
                <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Ubegrenset spilletid sammen med andre med avtale
              </li>
              <li className="flex items-center">
                <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Etablering kr 200
              </li>
            </ul>
            <div className="mt-6">
              <Link href="/contact" className="block text-center bg-blue-800 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition">
                Registrer
              </Link>
            </div>
          </div>
        </div>
        
        {/* Family Agreement */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-blue-800 p-6 text-center text-white">
            <h3 className="text-xl font-bold">FAMILIE</h3>
            <p className="text-2xl font-bold mt-2">349 kr<span className="text-sm font-normal">/mnd</span></p>
          </div>
          <div className="p-6">
            <ul className="space-y-3">
              <li className="flex items-center">
                <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                12 mnd. bindingstid
              </li>
              <li className="flex items-center">
                <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Ubegrenset spilletid sammen med familen eller andre med avtale
              </li>
              <li className="flex items-center">
                <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Etablering kr 200
              </li>
            </ul>
            <div className="mt-6">
              <Link href="/contact" className="block text-center bg-blue-800 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition">
                Registrer
              </Link>
            </div>
          </div>
        </div>
        
        {/* Student/Junior Agreement */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-gray-100 p-6 text-center">
            <h3 className="text-xl font-bold">STUDENT/JUNIOR</h3>
            <p className="text-2xl font-bold mt-2">199 kr<span className="text-sm font-normal">/mnd</span></p>
          </div>
          <div className="p-6">
            <ul className="space-y-3">
              <li className="flex items-center">
                <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                12 mnd. bindingstid
              </li>
              <li className="flex items-center">
                <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Ubegrenset spilletid
              </li>
              <li className="flex items-center">
                <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Etablering kr 200
              </li>
            </ul>
            <div className="mt-6">
              <Link href="/contact" className="block text-center bg-blue-800 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition">
                Registrer
              </Link>
            </div>
          </div>
        </div>
        
        {/* Single Month Agreement */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-gray-800 p-6 text-center text-white">
            <h3 className="text-xl font-bold">ENKELTMÅNED</h3>
            <p className="text-2xl font-bold mt-2">500 kr<span className="text-sm font-normal">/mnd</span></p>
          </div>
          <div className="p-6">
            <ul className="space-y-3">
              <li className="flex items-center">
                <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Velg antall måneder
              </li>
              <li className="flex items-center">
                <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Familie kr 700
              </li>
              <li className="flex items-center">
                <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Etablering kr 100
              </li>
              <li className="flex items-center">
                <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Gjelder fra dato til dato
              </li>
              <li className="flex items-center">
                <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Betales på forskudd
              </li>
            </ul>
            <div className="mt-6">
              <Link href="/contact" className="block text-center bg-blue-800 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition">
                Registrer
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-3xl mx-auto bg-gray-100 p-6 rounded-lg">
        <p className="mb-4">
          Spillenøkkel ordnes på squashsenteret mandager klokken 19.45 - 20.15.
        </p>
        <p>
          For andre tidspunkt ta kontakt på tlf. 913 72 666.
        </p>
      </div>
    </div>
  )
}