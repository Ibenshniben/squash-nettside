export default function Location() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">Finn oss</h1>
      
      <div className="max-w-4xl mx-auto mb-12">
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-bold mb-4">Adresse</h2>
          <p className="mb-4">
            Søm Squash<br />
            Haumyveien 39c<br />
            4637 Kristiansand
          </p>
          
          <h2 className="text-2xl font-bold mb-4 mt-6">Kontakt</h2>
          <p className="mb-1">Telefon: 913 72 666</p>
          <p>E-post: eyvind@somsquash.no</p>
          
          <h2 className="text-2xl font-bold mb-4 mt-6">Åpningstider</h2>
          <p className="mb-1">Mandag - Fredag: 07:00 - 23:00</p>
          <p className="mb-1">Lørdag: 09:00 - 22:00</p>
          <p>Søndag: 09:00 - 22:00</p>
          <p className="mt-2 text-sm italic">Medlemmer har tilgang alle dager med adgangsbrikke</p>
        </div>
        
        <h2 className="text-2xl font-bold mb-6">Kart</h2>
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
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Parkering</h2>
          <p>
            Det er gratis parkering tilgjengelig rett utenfor Søm Squash. 
            Følg skilting til Haumyveien 39c.
          </p>
        </div>
      </div>
    </div>
  )
}