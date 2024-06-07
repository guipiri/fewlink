import { notFound, redirect } from 'next/navigation'
import { prisma } from '../lib/prisma'

export default async function redirectRoute({
  params: { slug },
}: {
  params: { slug: string }
}) {
  let redirectPath: () => string | never = notFound
  try {
    const link = await prisma.links.findUnique({ where: { slug } })
    console.log(link)

    if (link) {
      redirectPath = () => link.redirectTo
      await prisma.clicks.create({ data: { linkId: link.id } })
    }
  } catch (erro) {
    notFound()
  }
  redirect(redirectPath())
}
