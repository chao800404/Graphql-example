"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authResolver = void 0;
const zod_1 = require("zod");
const bcrypt_1 = __importDefault(require("bcrypt"));
const validator_1 = __importDefault(require("validator"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const cookie_1 = __importDefault(require("cookie"));
const jwt_key = process.env.JWT_TOKEN_KEY;
const signToken = (id, email) => {
    return jsonwebtoken_1.default.sign({ id, email }, jwt_key);
};
const userSchema = zod_1.z.object({
    email: zod_1.z.string().refine(validator_1.default.isEmail, {
        message: "Please enter correct Email"
    }),
    password: zod_1.z.string().min(5),
});
exports.authResolver = {
    signup: (_, { name, email, password, bio }, { prisma, res }) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const parse = userSchema.safeParse({ email, password });
            if (parse.success) {
                const { data: { email, password } } = parse;
                const hashPassword = yield bcrypt_1.default.hash(password, 10);
                const user = yield prisma.user.create({
                    data: {
                        name,
                        email,
                        password: hashPassword
                    }
                });
                yield prisma.profile.create({
                    data: {
                        bio,
                        userId: user.id
                    }
                });
                const token = signToken(user.id, user.email);
                res.setHeader('Set-Cookie', cookie_1.default.serialize('newToken', token, {
                    httpOnly: true,
                    maxAge: 60 * 60 * 24 * 180 // 3 month
                }));
                return {
                    userErrors: [],
                    token,
                    user
                };
            }
            const errors = parse.error.issues.map(issue => {
                return { message: issue.message };
            });
            return {
                userErrors: [...errors],
                user: null,
                token: null
            };
        }
        catch (err) {
            console.log(err);
            return {
                userErrors: [{ message: "Something Error" }],
                user: null,
                token: null
            };
        }
    }),
    signin: (_, { email, password }, { prisma, res }) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const parse = userSchema.safeParse({ email, password });
            if (parse.success) {
                const { data: { email, password } } = parse;
                const user = yield prisma.user.findUnique({
                    where: { email }
                });
                if (!user)
                    throw new Error("Password or Email went wrong");
                const isMatch = yield bcrypt_1.default.compare(password, user.password);
                if (!isMatch)
                    throw new Error("Password or Email went wrongr");
                const token = signToken(user.id, user.email);
                res.setHeader('Set-Cookie', cookie_1.default.serialize('newToken', token, {
                    httpOnly: true,
                    maxAge: 60 * 60 * 24 * 180 // 3 month
                }));
                return {
                    userErrors: [],
                    token,
                    user
                };
            }
            const errors = parse.error.issues.map(issue => {
                return { message: issue.message };
            });
            return {
                userErrors: [...errors],
                user: null,
                token: null
            };
        }
        catch (err) {
            const { message } = err;
            return {
                userErrors: [{ message }],
                user: null,
                token: null
            };
        }
    })
};
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
//# sourceMappingURL=auth.js.map