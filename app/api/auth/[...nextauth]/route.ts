import NextAuth from 'next-auth'
import { authOptions } from './auth'

// Create the handler using the imported authOptions
const handler = NextAuth(authOptions)

// Re-export authOptions so other files can import it from this file
export { authOptions }

// Export the handler functions
export { handler as GET, handler as POST }