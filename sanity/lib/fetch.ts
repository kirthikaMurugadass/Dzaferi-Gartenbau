import { client } from './client'

/**
 * Reusable fetch helper for Sanity queries
 *
 * Features:
 * - Type-safe fetching with generics
 * - Automatic error handling
 * - Next.js cache integration
 * - Optional revalidation
 */
export async function sanityFetch<T = any>({
  query,
  params = {},
  tags = [],
  revalidate,
}: {
  query: string
  params?: Record<string, any>
  tags?: string[]
  revalidate?: number | false
}): Promise<T> {
  try {
    const data = await client.fetch<T>(query, params, {
      // Next.js cache configuration
      next: {
        revalidate: revalidate ?? 3600, // Default: revalidate every hour
        tags,
      },
    })

    return data
  } catch (error) {
    console.error('Sanity fetch error:', error)
    throw new Error(`Failed to fetch data from Sanity: ${error}`)
  }
}

/**
 * Revalidate home page cache by tag
 * Call this from an API route or webhook
 */
export function revalidateHomePage() {
  // This would be used with Next.js revalidateTag from next/cache
  // Example: revalidateTag('home')
  return ['home', 'homeModular']
}
