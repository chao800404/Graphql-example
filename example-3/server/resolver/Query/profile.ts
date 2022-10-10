import { ProfileResolver } from '../type'

export const profileResolver:ProfileResolver = {
  profile: async (_ ,{ userId }, { prisma , user }) => {
    return await prisma.profile.findUnique({
      where:{
        userId:Number(userId)
      }
    })
  }
}