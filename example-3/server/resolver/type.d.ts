import {prisma} from '../src/index'
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



type UserPayloadType = {
  userErrors:{message: string}[];
  token: string | null ;
  user: User | null ;
}

type UserPayloadType = {
  userErrors:{message: string}[];
  token: string | null ;
  user: User | null ;
}



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



export interface ProfileType {
  user:ResolverProps<any ,  Prisma.Prisma__ProfileClient<User | null>>
}


export interface PostResolver {
  posts: ResolverProps<any, Post[]>
}

export interface UserResolver {
  me: ResolverProps<any ,  UserPayloadType>
}

export interface ProfileResolver {
  profile:ResolverProps<any ,  Prisma.Prisma__ProfileClient<Profile | null>>
}

export interface PostType {
  user: ResolverProps<any ,  Prisma.Prisma__ProfileClient<User | null>>
}


export interface UserType {
  posts:ResolverProps<any ,  Prisma.Prisma__ProfileClient<Post[] | null>>
}
