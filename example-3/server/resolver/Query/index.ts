import { userResolver } from './auth';
import { postResolver } from './post'
import { profileResolver } from './profile'

export const Query = {
  ...postResolver,
  ...userResolver,
  ...profileResolver
}