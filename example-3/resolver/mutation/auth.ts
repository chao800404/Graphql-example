import { authMutation } from './type'
import { z } from "zod";
import validator from 'validator'

const userSchema = z.object({
  name:z.string(),
  email:z.string().refine(validator.isEmail,{
    message:"Please enter correct Email"
  }),
  password:z.string().min(5)
})

export const authResolver:authMutation = {
  signup:async (_,{  name , email , password } ,{ prisma})=> {

    const parse = userSchema.safeParse({ name , email , password})
    

    if(parse.success){
       const user = await prisma.user.create({
        data:{
          name,
          email,
          password
        }
      })
      return {
        userErrors:[],
        user
      }
    }

    const errors = parse.error.issues.map(issue => {
      return {message:issue.message}
    })

    return {
      userErrors:[...errors],
      user:null
    }
  }
}