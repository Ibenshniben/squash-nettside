import Image from 'next/image'

export default function About() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">Om Søm Squash</h1>
      
      <div className="max-w-4xl mx-auto mb-12">
        <p className="text-xl text-center mb-8">
          Søm Squash er Kristiansands ledende squashklubb, dedikert til å tilby førsteklasses fasiliteter og en inkluderende atmosfære for alle squashentusiaster.
        </p>
      </div>
      
      <div className="max-w-5xl mx-auto mb-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-2xl font-bold mb-4">Vår Historie</h2>
          <p className="mb-4">
            Søm Squash ble etablert i 2005 med en visjon om å skape et førsteklasses squashsenter i Kristiansand. 
            Gjennom årene har vi vokst til å bli den foretrukne destinasjonen for squashspillere på alle nivåer.
          </p>
          <p className="mb-4">
            Vårt dedikerte team jobber kontinuerlig for å forbedre fasilitetene og tjenestene våre, 
            og sikre at alle medlemmer og gjester får en eksepsjonell opplevelse hver gang de besøker oss.
          </p>
          <p>
            I dag er vi stolte av å tilby tre profesjonelle squashbaner, moderne garderobefasiliteter, 
            og et vennlig, inkluderende miljø for alle som deler vår lidenskap for squash.
          </p>
        </div>
        <div className="relative h-[400px] w-full">
          <div className="bg-gray-300 h-full w-full flex items-center justify-center">
            <p className="text-gray-600">Bilde av Søm Squash fasiliteter</p>
          </div>
        </div>
      </div>
      
      <div className="max-w-5xl mx-auto mb-16">
        <h2 className="text-2xl font-bold mb-6 text-center">Våre Fasiliteter</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-3">Profesjonelle Baner</h3>
            <p>Tre førsteklasses squashbaner med profesjonell belysning og klimakontroll for optimal spillopplevelse.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-3">Moderne Garderober</h3>
            <p>Rene og moderne garderobefasiliteter med dusjer, låsbare skap og håndklær tilgjengelig for medlemmer.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-3">Utstyrsutleie</h3>
            <p>Utleie av racketer og baller for de som er nye i sporten eller glemmer utstyret sitt hjemme.</p>
          </div>
        </div>
      </div>
      
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">Møt Teamet</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-gray-600">Bilde</span>
            </div>
            <h3 className="text-xl font-bold">Ole Hansen</h3>
            <p className="text-blue-800">Daglig Leder</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-gray-600">Bilde</span>
            </div>
            <h3 className="text-xl font-bold">Kari Olsen</h3>
            <p className="text-blue-800">Hovedtrener</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-gray-600">Bilde</span>
            </div>
            <h3 className="text-xl font-bold">Erik Johansen</h3>
            <p className="text-blue-800">Medlemsansvarlig</p>
          </div>
        </div>
      </div>
    </div>
  )
}