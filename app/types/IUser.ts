import { ILink } from './ILink'

export interface IUser {
  id: number
  email: string
  password?: string
  name?: string
  links: ILink[]
  role: 'USER' | 'ADMIN'
  createdAt: Date
  updatedAt: Date
}
