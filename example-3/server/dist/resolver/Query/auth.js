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
exports.userResolver = void 0;
exports.userResolver = {
    me: (_, __, { prisma, user }) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userId = user ? user.id : 0;
            const auth = yield prisma.user.findUnique({
                where: {
                    id: userId
                }
            });
            if (!auth)
                throw new Error("You must be logged in");
            return {
                userErrors: [],
                token: "fjewifjw",
                user: auth
            };
        }
        catch (err) {
            console.log(err);
            const { message } = err;
            return {
                userErrors: [{ message }],
                token: null,
                user: null
            };
        }
    })
};
//# sourceMappingURL=auth.js.map