import { NextRequest } from 'next/server'
import { UserAgent } from '../types/UserAgent'

export async function postClick(
  ua: UserAgent,
  req: NextRequest,
  linkId: string
): Promise<void> {
  const ip = req.headers.get('X-Forwarded-For') || 'undefined'
  const country = req.headers.get('x-vercel-ip-country') || 'undefined'
  const region = req.headers.get('x-vercel-ip-country-region') || 'undefined'
  const city = req.headers.get('x-vercel-ip-city') || 'undefined'
  console.log(`postClick-headers: ${ip}, ${country}, ${city}, ${region}.`)

  const {
    browser: { name: browser },
    device: { type: device },
    isBot,
    os: { name: os },
  } = ua
  const viewport = device === 'mobile' ? 'mobile' : 'desktop'

  // try {
  //   await prisma.clicks.create({
  //     data: {
  //       linkId,
  //       device: viewport,
  //       browser: `${browser.name}`,
  //       isBot,
  //       os: `${os.name}`,
  //       ...geo,
  //       ip: ip ? ip : 'undefined',
  //     },
  //   })
  // } catch (error) {}
}
