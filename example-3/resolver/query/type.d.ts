import { ResolverProps } from '../base'

export interface PostResolver {
  posts: ResolverProps<any, Post[]>
}
