import { User } from '@prisma/client';
import { prisma } from '../src/index'
import DataLoader from "dataloader";


type BatchUsers = (ids: number[] ) => Promise<User[]> 

const batchUsers:BatchUsers  = async(ids)=> {

  const users = await prisma.user.findMany({
    where:{
      id:{
        in:ids
      }
    }
  })

  const userMap = users.reduce((acc: { [key:string]: User } , next)=> {
    acc[next.id] = next
    return acc
  },{})

  return ids.map(id => userMap[id])  || new Error(`No result for ${ids}`)
}

//@ts-ignore
export const userLoader = new DataLoader(batchUsers)