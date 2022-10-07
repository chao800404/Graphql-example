import { Post,User } from '@prisma/client'
import { ResolverProps } from '../base'


type PostPayloadType<T> = {
  userErrors: { message: string }[];
  post: T | null;
}

type UserPayloadType = {
  userErrors:{message: string}[];
  token: string | null ;
  user: User | null;
}



export interface PostMuation {
  postCreate: ResolverProps<{ input: Post }, PostPayloadType<Post>>
  postUpdate: ResolverProps<{ postId: Int, input: Post }, PostPayloadType<Post>>
  postDelete: ResolverProps<{ postId: Int }, PostPayloadType<Post>>
}

export interface authMutation {
  signup:ResolverProps<User , UserPayloadType>
}