import { prisma } from '@/app/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const email = searchParams.get('userEmail')
  console.log(email)

  const user = await prisma.user.findUnique({
    where: { email: email || undefined },
  })
  // console.log(user)

  return NextResponse.json(user)
}
