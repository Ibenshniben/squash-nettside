import Link from 'next/link'

export default function Contact() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">Kontakt Oss</h1>
      
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          <div>
            <h2 className="text-2xl font-bold mb-6">Kontaktinformasjon</h2>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="mb-6">
                <h3 className="text-lg font-bold mb-2">Eyvind Strømsvåg</h3>
                <p className="text-gray-700 mb-1">Daglig leder</p>
                <p className="mb-1">Telefon: 913 72 666</p>
                <p>E-post: eyvind@somsquash.no</p>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-bold mb-2">Adresse</h3>
                <p>Søm Squash<br />
                Haumyveien 39c<br />
                4637 Kristiansand</p>
              </div>
              
              <div>
                <h3 className="text-lg font-bold mb-2">Åpningstider</h3>
                <p className="mb-1">Mandag - Fredag: 07:00 - 23:00</p>
                <p className="mb-1">Lørdag: 09:00 - 22:00</p>
                <p>Søndag: 09:00 - 22:00</p>
                <p className="mt-2 text-sm italic">Medlemmer har tilgang alle dager med adgangsbrikke</p>
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold mb-6">Send oss en melding</h2>
            
            <form className="bg-white p-6 rounded-lg shadow-md">
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Navn</label>
                <input 
                  type="text" 
                  id="name" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 font-bold mb-2">E-post</label>
                <input 
                  type="email" 
                  id="email" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="subject" className="block text-gray-700 font-bold mb-2">Emne</label>
                <input 
                  type="text" 
                  id="subject" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="message" className="block text-gray-700 font-bold mb-2">Melding</label>
                <textarea 
                  id="message" 
                  rows={5} 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                className="bg-blue-800 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition w-full"
              >
                Send Melding
              </button>
            </form>
          </div>
        </div>
        
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
      </div>
    </div>
  )
}