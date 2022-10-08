import { number } from 'zod'
import { ProfileResolver } from './type'

export const profileResolver:ProfileResolver = {
  user: async (parent ,_, { prisma , user }) => {
    const userId = parent.userId
    return await prisma.user.findUnique({
      where:{
        id:Number(userId)
      }
    })
  }
}