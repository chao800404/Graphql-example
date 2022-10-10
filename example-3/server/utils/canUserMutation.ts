import { prisma } from '../src/index'
import { Post , User } from '@prisma/client'

type CanUserMutationProp ={
  postId: Post["id"]
  userId: User["id"]
  prisma: typeof prisma
}

export const canUserMutation = async ({postId, userId , prisma}: CanUserMutationProp) => {
  try {
    const post = await prisma.post.findUnique({where: {id: Number(postId)}})
    const user = await prisma.user.findUnique({where: {id: Number(userId)}})
  
    if(!post) throw new Error("Please provide correct post id")
    if(!user) throw new Error("You must be logged in")
  
    return post?.userId === user?.id ? post : null 
  }catch(err){
    const { message } = err as Error
    throw new Error(message)
  }

}
