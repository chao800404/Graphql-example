import { ProfileType } from './type'

export const Profile:ProfileType = {
  user: async (parent ,_, { prisma , user }) => {
    const userId = parent.userId
    return await prisma.user.findUnique({
      where:{
        id:Number(userId)
      }
    })
  }
}