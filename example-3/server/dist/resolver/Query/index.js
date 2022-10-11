"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Query = void 0;
const auth_1 = require("./auth");
const post_1 = require("./post");
const profile_1 = require("./profile");
exports.Query = Object.assign(Object.assign(Object.assign({}, post_1.postResolver), auth_1.userResolver), profile_1.profileResolver);
//# sourceMappingURL=index.js.map