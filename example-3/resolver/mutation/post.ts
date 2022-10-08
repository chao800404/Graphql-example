
import { PostMuation } from './type'
import { canUserMutation } from '../../utils/canUserMutation'
import { z } from "zod";


export const postResolver:PostMuation = {

  postCreate: async (_, { input }, { prisma , user }) => {
    try{
      const { title, content } = input
      if (!title || !content) throw new Error("Please provide title and content")
      if(!user) throw new Error("You must be logged in")
      const post = await prisma.post.create({
        data: {
          title,
          content,
          userId: user.id 
        }
      })
      return {
        userErrors: [],
        post
      }
    }catch(err){
      const {message} = err as Error
      return {
        userErrors: [{message}],
        post:null
      }
    }
  },

  postUpdate: async (_, { postId, input }, { prisma  , user}) => {
    try {
      const { title, content } = input
      const userId = user ? user.id : 0
      const post = await canUserMutation({postId , userId: userId , prisma})

      if (!post) throw new Error("You can't edit this post")

      const existingPost = await prisma.post.findUnique({
        where: {
          id: Number(postId)
        },
      })

      if ((!title && !content) || !existingPost) throw new Error("Please provide title or content and postId")

      return {
        userErrors: [],
        post: await prisma.post.update({
          where: {
            id: Number(postId)
          },
          data: {
            title,
            content
          }
        })
      }

    } catch (err) {
      const {message} = err as Error
      return {
        userErrors: [{message}],
        post:null
      }
    }
  },

  postPublish:async(_,{postId , published},{prisma , user})=> {
    try {
      const userId = user ? user.id : 0
      const post = await canUserMutation({postId , userId: userId , prisma})
      const parse = z.boolean().safeParse(published)
  
      if (!post) throw new Error("You can't edit this post")
      if (!parse.success) throw new Error(parse.error.issues[0].message)
  
      return {
        userErrors: [],
        post: await prisma.post.update({
          where: {
            id: Number(postId),
          },
          data:{
            published
          }
        })
      }

    }catch(err){
      const {message} = err as Error
      return {
        userErrors: [{message}],
        post:null
      }
    }
  },

  postDelete:async (_, { postId }, { prisma , user })=> {
    try {
      const userId = user ? user.id : 0
      const post = await canUserMutation({postId , userId: userId , prisma})
  
      if (!post) throw new Error("You can't edit this post")
  
      return {
        userErrors: [],
        post: await prisma.post.delete({
          where: {
            id: Number(postId),
          }
        })
      }

    }catch(err){
      const {message} = err as Error
      return {
        userErrors: [{message}],
        post:null
      }
    }
  }
}