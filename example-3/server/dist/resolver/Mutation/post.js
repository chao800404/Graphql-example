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
Object.defineProperty(exports, "__esModule", { value: true });
exports.postResolver = void 0;
const canUserMutation_1 = require("../../utils/canUserMutation");
const zod_1 = require("zod");
exports.postResolver = {
    postCreate: (_, { input }, { prisma, user }) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { title, content } = input;
            if (!title || !content)
                throw new Error("Please provide title and content");
            if (!user)
                throw new Error("You must be logged in");
            const post = yield prisma.post.create({
                data: {
                    title,
                    content,
                    userId: user.id
                }
            });
            return {
                userErrors: [],
                post
            };
        }
        catch (err) {
            const { message } = err;
            return {
                userErrors: [{ message }],
                post: null
            };
        }
    }),
    postUpdate: (_, { postId, input }, { prisma, user }) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { title, content } = input;
            const userId = user ? user.id : 0;
            const post = yield (0, canUserMutation_1.canUserMutation)({ postId, userId: userId, prisma });
            if (!post)
                throw new Error("You can't edit this post");
            const existingPost = yield prisma.post.findUnique({
                where: {
                    id: Number(postId)
                },
            });
            if ((!title && !content) || !existingPost)
                throw new Error("Please provide title or content and postId");
            return {
                userErrors: [],
                post: yield prisma.post.update({
                    where: {
                        id: Number(postId)
                    },
                    data: {
                        title,
                        content
                    }
                })
            };
        }
        catch (err) {
            const { message } = err;
            return {
                userErrors: [{ message }],
                post: null
            };
        }
    }),
    postPublish: (_, { postId, published }, { prisma, user }) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userId = user ? user.id : 0;
            const post = yield (0, canUserMutation_1.canUserMutation)({ postId, userId: userId, prisma });
            const parse = zod_1.z.boolean().safeParse(published);
            if (!post)
                throw new Error("You can't edit this post");
            if (!parse.success)
                throw new Error(parse.error.issues[0].message);
            return {
                userErrors: [],
                post: yield prisma.post.update({
                    where: {
                        id: Number(postId),
                    },
                    data: {
                        published
                    }
                })
            };
        }
        catch (err) {
            const { message } = err;
            return {
                userErrors: [{ message }],
                post: null
            };
        }
    }),
    postDelete: (_, { postId }, { prisma, user }) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userId = user ? user.id : 0;
            const post = yield (0, canUserMutation_1.canUserMutation)({ postId, userId: userId, prisma });
            if (!post)
                throw new Error("You can't edit this post");
            return {
                userErrors: [],
                post: yield prisma.post.delete({
                    where: {
                        id: Number(postId),
                    }
                })
            };
        }
        catch (err) {
            const { message } = err;
            return {
                userErrors: [{ message }],
                post: null
            };
        }
    })
};
//# sourceMappingURL=post.js.map