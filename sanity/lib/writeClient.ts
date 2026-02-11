import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from '../env'

// Write client for server-side operations (uses write token)
// This client has write permissions and should only be used in API routes
export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN,
})
