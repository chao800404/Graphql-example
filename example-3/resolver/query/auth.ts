import { UserResolver } from './type'

export const userResolver:UserResolver = {
  me: async (_, __, { prisma , user }) => {
    try {
      const userId = user ? user.id : 0 
      const auth = await prisma.user.findUnique({
        where: {
          id: userId
        }
      })

      if(!auth) throw new Error("You must be logged in")

      return {
        userErrors:[],
        token:"fjewifjw",
        user:auth
      }

    }catch(err){
      console.log(err)
      const {message} = err as Error
      return {
        userErrors: [{message}],
        token:null,
        user:null
      }
    }
  }
}