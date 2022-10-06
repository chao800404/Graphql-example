import { QueryResolver } from './type'

export const Query: QueryResolver = {
  posts: async (_, __, { prisma }) => {
    const posts = await prisma.post.findMany({
      orderBy: {
        createdAt: "asc"
      }
    })
    return posts
  }
}

