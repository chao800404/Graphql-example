import { Post,User } from '@prisma/client'
import { ResolverProps } from '../base'


type PostPayloadType<T> = {
  userErrors: { message: string }[];
  post: T | null;
}

type PostPayloadType = {
  userErrors:{message: string}[],
  user:User | null
}



export interface PostMuation {
  postCreate: ResolverProps<{ input: Post }, PostPayloadType<Post>>
  postUpdate: ResolverProps<{ postId: Int, input: Post }, PostPayloadType<Post>>
  postDelete: ResolverProps<{ postId: Int }, PostPayloadType<Post>>
}

export interface authMutation {
  signup:ResolverProps<User , PostPayloadType>
}