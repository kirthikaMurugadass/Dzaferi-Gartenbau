import { revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

/**
 * API Route for revalidating cached Sanity content
 * 
 * Usage:
 * POST /api/revalidate?secret=YOUR_SECRET&tag=home
 * 
 * Set up as a webhook in Sanity:
 * 1. Go to your Sanity project settings
 * 2. Add webhook: https://yoursite.com/api/revalidate?secret=YOUR_SECRET&tag=home
 * 3. Trigger on: Home page publish/unpublish
 */
export async function POST(request: NextRequest) {
  // Validate secret token
  const secret = request.nextUrl.searchParams.get('secret')
  const expectedSecret = process.env.SANITY_REVALIDATE_SECRET

  if (!expectedSecret) {
    console.error('SANITY_REVALIDATE_SECRET not configured')
    return NextResponse.json(
      { message: 'Revalidation not configured' },
      { status: 500 }
    )
  }

  if (secret !== expectedSecret) {
    return NextResponse.json(
      { message: 'Invalid secret token' },
      { status: 401 }
    )
  }

  try {
    // Get tag from query params (optional)
    const tag = request.nextUrl.searchParams.get('tag')

    if (tag) {
      // Revalidate specific tag
      await revalidateTag(tag)
      console.log(`Revalidated tag: ${tag}`)
      
      return NextResponse.json({
        revalidated: true,
        tag,
        now: Date.now(),
      })
    }

    // Default: revalidate all home page tags
    const tags = ['home', 'home-en', 'home-de']
    for (const t of tags) {
      await revalidateTag(t)
    }
    console.log(`Revalidated tags: ${tags.join(', ')}`)

    return NextResponse.json({
      revalidated: true,
      tags,
      now: Date.now(),
    })
  } catch (error) {
    console.error('Error revalidating:', error)
    return NextResponse.json(
      { message: 'Error revalidating', error: String(error) },
      { status: 500 }
    )
  }
}

/**
 * GET endpoint for testing
 */
export async function GET() {
  return NextResponse.json({
    message: 'Revalidation endpoint is active',
    usage: 'POST /api/revalidate?secret=YOUR_SECRET&tag=home',
  })
}
