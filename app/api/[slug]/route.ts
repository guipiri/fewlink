import { prisma } from '@/app/lib/prisma'
import { postClick } from '@/app/services/postClick'
import { NextRequest, NextResponse, userAgent } from 'next/server'

export async function GET(
  req: NextRequest,
  { params: { slug } }: { params: { slug: string } }
) {
  console.log(`route-GET-geo-obj: ${req.geo}`)
  const res = await prisma.links.findUnique({
    select: { redirectTo: true, id: true },
    where: { slug },
  })
  if (res) {
    postClick(userAgent(req), req, res?.id)
    // if (res) return NextResponse.redirect(res.redirectTo)
  }
  //Redirecionar para a home
  return NextResponse.json(req.geo)
}
