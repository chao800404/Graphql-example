import { ResolverProps } from '../base'
import { Post, User , Profile  } from '@prisma/client'


type UserPayloadType = {
  userErrors:{message: string}[];
  token: string | null ;
  user: User | null ;
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


