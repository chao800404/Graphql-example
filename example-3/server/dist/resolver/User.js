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
exports.User = void 0;
exports.User = {
    posts: (parent, _, { prisma, user }) => __awaiter(void 0, void 0, void 0, function* () {
        const isOwnProfile = parent.id === (user === null || user === void 0 ? void 0 : user.id);
        console.log("server run");
        if (isOwnProfile) {
            return prisma.post.findMany({
                where: {
                    userId: Number(user.id)
                },
                orderBy: [
                    { createdAt: "desc" }
                ]
            });
        }
        else {
            return prisma.post.findMany({
                where: {
                    userId: Number(parent.id),
                    published: true
                },
                orderBy: [
                    { createdAt: "desc" }
                ]
            });
        }
    })
};
//# sourceMappingURL=User.js.map