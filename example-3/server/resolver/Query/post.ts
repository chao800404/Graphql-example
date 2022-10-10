import { PostResolver } from '../type'

export const postResolver:PostResolver = {
  posts: async (_, __, { prisma }) => {
    const posts = await prisma.post.findMany({
      orderBy: {
        createdAt: "asc"
      }
    })
    return posts
  }
}