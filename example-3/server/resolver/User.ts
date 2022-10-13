import { UserType } from './type'


type UserParentType = {
  id: number 
}


export const User:UserType = {
  posts: async (parent:UserParentType ,_, { prisma , user }) => {
    const isOwnProfile = parent.id === user?.id
 
    if(isOwnProfile ){
      return prisma.post.findMany({
        where:{
          userId: Number(user.id)
        },
        orderBy:[
          {createdAt:"desc"}
        ]
      })
   
    }else {
      return prisma.post.findMany({
        where:{
          userId: Number(parent.id),
          published: true
        },
        orderBy:[
          {createdAt:"desc"}
        ]
      })
    }
  }
}