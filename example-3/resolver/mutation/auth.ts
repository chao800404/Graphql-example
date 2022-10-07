import { authMutation } from './type'
import { z } from "zod";
import bcrypt from 'bcrypt';
import validator from 'validator'
import jwt from 'jsonwebtoken'
import cookie from 'cookie'


const jwt_key = process.env.JWT_TOKEN_KEY as string

const signToken = (id:Number , email:string)=> {
  return jwt.sign({id , email}, jwt_key)
}




const userSchema = z.object({
  name:z.string(),
  email:z.string().refine(validator.isEmail,{
    message:"Please enter correct Email"
  }),
  password:z.string().min(5)
})



export const authResolver:authMutation = {

  signup:async (_,{  name , email , password } ,{ prisma , res })=> {
    try {
      const parse = userSchema.safeParse({ name , email , password})
      if(parse.success){
         const { data: { name, email, password }} = parse
         const hashPassword = await bcrypt.hash(password , 10)

         const user = await prisma.user.create({
          data:{
            name,
            email,
            password:hashPassword
          }
        })

        const token = signToken(user.id, user.email)

        res.setHeader('Set-Cookie', cookie.serialize('newToken',token, {
          httpOnly: true,
          maxAge: 60 * 60 * 24 * 180 // 3 month
        }));

        return {
          userErrors:[],
          token,
          user
        }

  
      }
      const errors = parse.error.issues.map(issue => {
        return {message:issue.message}
      })
  
      return {
        userErrors:[...errors],
        user:null,
        token:null
      }

    }catch (err) {
      console.log(err)
      return {
        userErrors:[{message:"Something Error"}],
        user:null,
        token:null
      }
    }
  }
}