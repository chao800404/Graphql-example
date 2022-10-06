import { Post } from '@prisma/client'
import { prisma } from '../src/index'



type PostPayloadType<T> = {
  userErrors: { message: string }[];
  post: T | null;
}

type ResolverProps<T, J> = (parent: any, args: T, content: { prisma: typeof prisma }) => Promise<J>

export interface QueryResolver {
  posts: ResolverProps<any, Post[]>
}

export interface MutationResolver {
  postCreate: ResolverProps<{ input: Post }, PostPayloadType<Post>>
  postUpdate: ResolverProps<{ postId: Int, input: Post }, PostPayloadType<Post>>
  postDelete: ResolverProps<{ postId: Int }, PostPayloadType<Post>>
}
