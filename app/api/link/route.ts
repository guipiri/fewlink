import { prisma } from '@/app/lib/prisma'
import { ILinks } from '@/app/providers/UserProvider'
import { IResponse } from '@/app/types/IResponse'
import { generateRandomSlug } from '@/app/utils/generateRandomSlug'
import { Links } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const data: Omit<Links, 'createdAt' | 'updatedAt' | 'id'> = await req.json()

  if (!data) {
    return NextResponse.json({
      success: false,
      message: 'Solicitação mal-formada!',
    })
  }

  if (!data.userId) {
    return NextResponse.json({
      success: false,
      message: 'Faça login primeiro!',
    })
  }

  if (!data.slug) {
    data.slug = generateRandomSlug()
  }

  try {
    await prisma.links.create({ data })

    return NextResponse.json({
      success: true,
      message: 'Link criado com sucesso!',
    })
  } catch (error: any) {
    let response = { success: false, message: 'Erro no servidor' }

    if (error.code == 'P2002') {
      response.message = 'Este apelido já existe!'
    }

    return NextResponse.json(response)
  }
}

export async function DELETE(req: NextRequest) {
  const { linkId } = await req.json()
  if (!linkId) {
    return NextResponse.json({
      success: false,
      message: 'Id do link é necessário para esta operação!',
    })
  }
  try {
    await prisma.clicks.deleteMany({ where: { linkId } })
    await prisma.links.delete({ where: { id: linkId } })

    return NextResponse.json({
      success: true,
      message: 'Link excluído com sucesso!',
    })
  } catch (error: any) {
    let response = { success: false, message: 'Erro no servidor' }

    if (error.code == 'P2025') {
      response.message = 'Este apelido não existe!'
    }

    return NextResponse.json(response)
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const userId = searchParams.get('userId')
  const initialDate = searchParams.get('initialDate')
  const finalDate = searchParams.get('finalDate')
  if (!userId) {
    return NextResponse.json({
      success: false,
      message: 'Id do usuário é necessário para esta operação!',
    })
  }
  if (!(initialDate && finalDate))
    return NextResponse.json({
      success: true,
      message: 'sem final date',
    })
  console.log([initialDate, finalDate])

  const init = new Date(initialDate)
  const final = new Date(finalDate)
  console.log([init, final])

  try {
    const links = await prisma.links.findMany({
      where: { userId },
      include: {
        _count: {
          select: {
            clicks: {
              where: { createdAt: { gte: init, lte: final } },
            },
          },
        },
      },
    })
    return NextResponse.json<IResponse<ILinks[]>>({
      success: true,
      data: links,
    })
  } catch (error: any) {
    let response = { success: false, message: error.message }
    return NextResponse.json<IResponse>(response)
  }
}
