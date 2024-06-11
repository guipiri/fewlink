import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  console.log(req)
  let ip = req.headers.get('X-Forwarded-For')
  return NextResponse.json({ teste: req.geo })
}
