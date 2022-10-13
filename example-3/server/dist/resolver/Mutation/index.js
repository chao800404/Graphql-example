"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mutation = void 0;
const post_1 = require("./post");
const auth_1 = require("./auth");
exports.Mutation = Object.assign(Object.assign({}, post_1.postResolver), auth_1.authResolver);
//# sourceMappingURL=index.js.map