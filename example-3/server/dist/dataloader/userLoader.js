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
exports.userLoader = void 0;
const index_1 = require("../src/index");
const dataloader_1 = __importDefault(require("dataloader"));
const batchUsers = (ids) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield index_1.prisma.user.findMany({
        where: {
            id: {
                in: ids
            }
        }
    });
    const userMap = users.reduce((acc, next) => {
        acc[next.id] = next;
        return acc;
    }, {});
    return ids.map(id => userMap[id]) || new Error(`No result for ${ids}`);
});
//@ts-ignore
exports.userLoader = new dataloader_1.default(batchUsers);
//# sourceMappingURL=userLoader.js.map