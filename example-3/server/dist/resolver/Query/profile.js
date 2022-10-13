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
exports.profileResolver = void 0;
exports.profileResolver = {
    profile: (_, { userId }, { prisma, user }) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(user);
        const profile = yield prisma.user.findUnique({ where: {
                id: Number(userId)
            } }).profile();
        return profile ? Object.assign(Object.assign({}, profile), { isMyProfile: Number(userId) === (user === null || user === void 0 ? void 0 : user.id) }) : null;
    })
};
//# sourceMappingURL=profile.js.map