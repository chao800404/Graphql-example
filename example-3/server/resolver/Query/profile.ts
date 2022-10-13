import { ProfileResolver } from '../type'

export const profileResolver:ProfileResolver = {
  profile: async (_ ,{ userId }, { prisma , user }) => {

    console.log(user)
    const profile = await prisma.user.findUnique({where:{
      id: Number(userId)
    }}).profile()

    return profile ? { ...profile , isMyProfile:Number(userId) === user?.id } : null
  }
}

