import { NextRequest, NextResponse } from 'next/server'

// run only on homepage
export const config = {
  matcher: '/:path?',
}

export function middleware(req: NextRequest) {
  const { nextUrl: url, geo } = req
  const country = geo?.country || 'undefined'
  const city = geo?.city || 'undefined'
  const region = geo?.region || 'undefined'
  console.log(`middleware-geo-obj: ${geo}`)

  url.searchParams.set('country', country)
  url.searchParams.set('city', city)
  url.searchParams.set('region', region)

  return NextResponse.rewrite(url)
}
