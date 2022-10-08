import { Post, User  } from '@prisma/client'
import { ResolverProps } from '../base'


type PostPayloadType<T> = {
  userErrors: { message: string }[];
  post: T | null;
}

type UserPayloadType = {
  userErrors:{message: string}[];
  token: string | null ;
  user: User | null ;
}




export interface PostMuation {
  postCreate: ResolverProps<{ input: Post }, PostPayloadType<Post>>
  postUpdate: ResolverProps<{ postId: number, input: Post }, PostPayloadType<Post>>
  postDelete: ResolverProps<{ postId: number }, PostPayloadType<Post>>
  postPublish: ResolverProps<{ postId: number , published: boolean }, PostPayloadType<Post>>
}

export interface authMutation {
  signup:ResolverProps<User & Profile  , UserPayloadType>
  signin:ResolverProps<User, UserPayloadType>
}