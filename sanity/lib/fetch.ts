import { client } from './client'
import { LocaleId } from '../schemaTypes/fields/multilingualField'

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
 * Helper to fetch home page data with locale
 */
export async function fetchHomePage(locale: LocaleId, revalidate?: number | false) {
  const { getHomePageQuery } = await import('./queries/homeQueries')
  
  return sanityFetch({
    query: getHomePageQuery(locale),
    params: { locale },
    tags: ['home', `home-${locale}`],
    revalidate,
  })
}

/**
 * Helper to fetch modular home page data with locale
 */
export async function fetchModularHomePage(locale: LocaleId, revalidate?: number | false) {
  const { getModularHomePageQuery } = await import('./queries/homeModularQueries')
  
  return sanityFetch({
    query: getModularHomePageQuery(locale),
    params: { locale },
    tags: ['homeModular', `homeModular-${locale}`, 'service', 'project'],
    revalidate,
  })
}

/**
 * Revalidate home page cache by tag
 * Call this from an API route or webhook
 */
export function revalidateHomePage() {
  // This would be used with Next.js revalidateTag from next/cache
  // Example: revalidateTag('home')
  return ['home', 'home-en', 'home-de', 'homeModular', 'homeModular-en', 'homeModular-de']
}
