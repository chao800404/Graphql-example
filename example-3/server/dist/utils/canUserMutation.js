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
exports.canUserMutation = void 0;
const canUserMutation = ({ postId, userId, prisma }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield prisma.post.findUnique({ where: { id: Number(postId) } });
        const user = yield prisma.user.findUnique({ where: { id: Number(userId) } });
        if (!post)
            throw new Error("Please provide correct post id");
        if (!user)
            throw new Error("You must be logged in");
        return (post === null || post === void 0 ? void 0 : post.userId) === (user === null || user === void 0 ? void 0 : user.id) ? post : null;
    }
    catch (err) {
        const { message } = err;
        throw new Error(message);
    }
});
exports.canUserMutation = canUserMutation;
//# sourceMappingURL=canUserMutation.js.map