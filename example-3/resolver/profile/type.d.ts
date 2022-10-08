import { ResolverProps } from '../base'
import { Post, User , Profile  } from '@prisma/client'


type UserPayloadType = {
  userErrors:{message: string}[];
  token: string | null ;
  user: User | null ;
}





export interface ProfileResolver {
   user:ResolverProps<any ,  Prisma.Prisma__ProfileClient<User | null>>
}