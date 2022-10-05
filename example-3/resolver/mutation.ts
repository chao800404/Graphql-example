import { Post } from '@prisma/client'
import { prisma } from '../src/index'


type ResolverProps<T> = (parent: any, args: Post, content: { prisma: typeof prisma }) => T

interface MutationResolver {
  postCreate: ResolverProps<ResolverRes>
}

type ResolverRes = Promise<{ userError: [string]; post: Post; }>


export const Mutation: MutationResolver = {
  postCreate: async (_: any, { title, content }, { prisma }) => {
    const post = await prisma.post.create({
      data: {
        title,
        content,
        userId: 1,
      }
    })

    return {
      userError: ["user"],
      post
    }
  }
}