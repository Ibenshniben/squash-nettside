import Image from 'next/image'

export default function About() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">Om Søm Squash</h1>
      
      <div className="max-w-4xl mx-auto mb-12">
        <p className="text-xl text-center mb-8">
          Søm Squash tilbyr squashbaner av god kvalitet i Kristiansand. Vårt mål er å skape et hyggelig miljø for alle som ønsker å spille squash, uavhengig av nivå.
        </p>
      </div>
      
      <div className="max-w-5xl mx-auto mb-16 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="px-4">
          <h2 className="text-2xl font-bold mb-4">Vår Historie</h2>
          <p className="mb-4">
            Søm Squash ble etablert med en visjon om å skape et godt squashsenter i Kristiansand. 
          </p>
          <p>
            I dag tilbyr vi tre squashbaner, garderobefasiliteter, 
            og et vennlig, inkluderende miljø for alle som ønsker å spille squash.
          </p>
        </div>
        <div className="relative h-[300px] md:h-[400px] w-full mx-auto max-w-[90%] md:max-w-full">
          <Image 
            src="/images/som-squash-logo.png" 
            alt="Søm Squash fasiliteter" 
            fill 
            style={{ objectFit: 'contain' }}
            className="rounded-lg shadow-md"
            priority
          />
        </div>
      </div>
      
      {/* Eyvind Strømsvåg section */}
      <div className="max-w-4xl mx-auto mb-12">
        <div className="bg-white p-8 rounded-lg shadow-md mb-12">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/3 mb-6 md:mb-0 md:pr-8">
              <div className="relative w-48 h-48 mx-auto rounded-full overflow-hidden">
                <Image 
                  src="/images/eyvind.jpg" 
                  alt="Eyvind Strømsvåg" 
                  fill
                  style={{objectFit: 'cover'}}
                  className="rounded-full"
                />
              </div>
            </div>
            <div className="md:w-2/3">
              <h2 className="text-2xl font-bold mb-4">Eyvind Strømsvåg</h2>
              <p className="text-gray-700 mb-4">Daglig leder og eier</p>
              <p className="mb-4">
                Eyvind Strømsvåg driver Søm Squash med fokus på å tilby gode fasiliteter for squashspillere i Kristiansand. Med lang erfaring innen squash sørger han for at anlegget holdes i god stand og at medlemmene får en god opplevelse.
              </p>
              <p>
                Kontakt: <a href="mailto:eyvind@somsquash.no" className="text-blue-800 hover:underline">eyvind@somsquash.no</a> | Tlf: 913 72 666
              </p>
            </div>
          </div>
        </div>
        
        <h2 className="text-2xl font-bold mb-6">Våre fasiliteter</h2>
        <ul className="list-disc pl-6 mb-8 space-y-2">
          <li>3 squashbaner</li>
          <li>Garderober med dusj</li>
          <li>Gratis parkering</li>
          <li>Enkel tilgang med brikke for medlemmer</li>
        </ul>
        
        <h2 className="text-2xl font-bold mb-6">Beliggenhet</h2>
        <p className="mb-6">
          Søm Squash ligger i Haumyveien 39c i Kristiansand, med enkel adkomst og gode parkeringsmuligheter.
        </p>
        
        <div className="aspect-w-16 aspect-h-9 mb-8">
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
      </div>
    </div>
  )
}