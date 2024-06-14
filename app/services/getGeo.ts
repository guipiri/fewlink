export interface IGeo {
  query: string
  status: string
  country: string
  countryCode: string
  region: string
  regionName: string
  city: string
  zip: string
  lat: string
  lon: string
  timezone: string
  isp: string
  org: string
  as: string
}
export async function getGeo(ip: string | null): Promise<IGeo | null> {
  if (!ip) return null
  const res = await fetch('http://ip-api.com/json/187.19.179.133')
  const geo: IGeo = await res.json()
  return geo
}
