import NextAuth from 'next-auth'
import { authOptions } from './auth'

// Create the handler using the imported authOptions
const handler = NextAuth(authOptions)

// Export the handler functions
export { handler as GET, handler as POST }