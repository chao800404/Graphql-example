import { prisma } from '../src/index'
import JWT from 'jsonwebtoken'
import { User } from '@prisma/client'

export interface ApolloContext {
  prisma: typeof prisma 
  user: User | null
  req:  express.Request
  res:express.Response
}


export type ResolverProps<T, J> = (
  parent: any, 
  args: T, 
  context: ApolloContext 
) => Promise<J>