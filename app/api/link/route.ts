import { prisma } from '@/app/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const data = await req.json()

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
