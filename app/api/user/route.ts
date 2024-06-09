import { prisma } from '@/app/lib/prisma'
import { IResponse } from '@/app/types/IResponse'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const email = searchParams.get('email')
  try {
    const user = await prisma.user.findUnique({
      where: { email: email || undefined },
      include: { links: { include: { _count: true } } },
    })
    return NextResponse.json(user)
  } catch (error) {
    return NextResponse.json<IResponse>({
      success: false,
      message: 'Algo errado no servidor!',
    })
  }
}
