import { User } from '@prisma/client'
import { ILink } from './ILink'

export interface IUser extends User {
  links: [ILink]
}
