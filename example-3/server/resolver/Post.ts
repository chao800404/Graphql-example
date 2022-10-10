import { PostType } from './type'
import { userLoader } from '../dataloader/userLoader'

type PostParentType = {
  userId: number
}


export const Post:PostType = {
  user:async(parent:PostParentType , __ , {prisma})=> {
    return userLoader.load(parent.userId)
  }
}




