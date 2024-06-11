import { notFound, redirect } from 'next/navigation'
import { prisma } from '../lib/prisma'

export default async function redirectRoute({
  params: { slug },
  searchParams,
}: {
  params: { slug: string }
  searchParams: any
}) {
  let redirectPath: () => string | never = notFound
  console.log(searchParams)

  try {
    const link = await prisma.links.findUnique({ where: { slug } })

    if (link) {
      redirectPath = () => link.redirectTo
      await prisma.clicks.create({ data: { linkId: link.id } })
    }
  } catch (erro) {
    notFound()
  }
  redirect(redirectPath())
}
