import { authMutation } from '../type'
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
  email:z.string().refine(validator.isEmail,{
    message:"Please enter correct Email"
  }),
  password:z.string().min(5),
})



export const authResolver:authMutation = {

  signup:async (_,{  name , email , password , bio } ,{ prisma , res })=> {
    try {
      const parse = userSchema.safeParse({email,password})

      if(parse.success){
         const { data: { email, password }} = parse
         const hashPassword = await bcrypt.hash(password , 10)


        const user = await prisma.user.create({
          data:{
            name,
            email,
            password:hashPassword
          }
        })

        await prisma.profile.create({
          data:{
            bio,
            userId:user.id
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
  },
  signin: async (_,{ email , password  } ,{ prisma , res })=>{
    try {
      const parse = userSchema.safeParse({email,password})

      if(parse.success){
         const { data: { email, password }} = parse
         const user = await prisma.user.findUnique({
          where:{ email}
        }) 

        if(!user) throw new Error("Password or Email went wrong")
  
        const isMatch = await bcrypt.compare(password , user.password)

        if(!isMatch) throw new Error("Password or Email went wrongr")

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
      const{ message } = err as Error
      return {
        userErrors:[{message}],
        user:null,
        token:null
      }
    }
  }

}



// try{
//   const parse = userSchema.safeParse({email,password})

//   if(parse.success){
//     const { data: { email, password }} = parse
//     const existUser = await prisma.user.findUnique({ where:{email}})
//     if(!existUser) throw new Error('Email or password or wrong')
    


//     return {
//       userErrors:[],
//       user:existUser,
//       token:"fejwifhweifw"
//     }

//   }


//   const errors = parse.error.issues.map(issue => {
//     return {message:issue.message}
//   })

//   return {
//     userErrors:[...errors],
//     user:null,
//     token:null
//   }

// }catch(err){
//   console.log(err)
//   return {
//     userErrors:[{message:err}],
//     user:null,
//     token:null
//   }
// }