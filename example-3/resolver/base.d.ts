import { prisma } from '../src/index'


export type ResolverProps<T, J> = (parent: any, args: T, content: { prisma: typeof prisma }) => Promise<J>