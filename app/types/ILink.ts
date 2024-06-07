export interface ILink {
  id: number
  slug: string
  redirectTo: string
  userId: string
  createdAt: Date
  updatedAt: Date
}

export interface DTOILink {
  slug: string
  redirectTo: string
  userId: string
}
