
import { PostMuation} from './type'

export const postResolver:PostMuation = {

  postCreate: async (_, { input }, { prisma }) => {
    const { title, content } = input
    if (!title || !content) {
      return {
        userErrors: [{
          message: "Please provide title and content"
        }],
        post: null
      }
    }
    const post = await prisma.post.create({
      data: {
        title,
        content,
        userId: 1
      }
    })
    return {
      userErrors: [],
      post
    }
  },

  postUpdate: async (_, { postId, input }, { prisma }) => {
    try {
      const { title, content } = input

      const existingPost = await prisma.post.findUnique({
        where: {
          id: Number(postId)
        },
      })

      if ((!title && !content) || !existingPost) {
        return {
          userErrors: [{
            message: "Please provide title or content and postId"
          }],
          post: null
        }
      }

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

    } catch (error) {
      console.log(error)
      return {
        userErrors: [{
          message: "Something error"
        }],
        post: null
      }
    }
  },

  postDelete:async (_, { postId }, { prisma })=> {
    const existingPost = await prisma.post.findUnique({
      where: {
        id: Number(postId)
      },
    })

    if (!existingPost) {
      return {
        userErrors: [{
          message: "Please provide the correct Id"
        }],
        post: null
      }
    }

    return {
      userErrors: [],
      post: await prisma.post.delete({
        where: {
          id: Number(postId)
        }
      })
    }

  }
}