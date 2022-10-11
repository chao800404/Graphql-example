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
exports.prisma = void 0;
const apollo_server_express_1 = require("apollo-server-express");
const client_1 = require("@prisma/client");
const apollo_server_core_1 = require("apollo-server-core");
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const schema_1 = require("./schema");
const resolver_1 = require("../resolver");
const cookie_1 = __importDefault(require("cookie"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const cors_1 = __importDefault(require("cors"));
const jwt_key = process.env.JWT_TOKEN_KEY;
exports.prisma = new client_1.PrismaClient();
const resolvers = {
    Query: resolver_1.Query,
    Mutation: resolver_1.Mutation,
    Profile: resolver_1.Profile,
    User: resolver_1.User,
    Post: resolver_1.Post
};
function startApolloServer({ typeDefs, resolvers }) {
    return __awaiter(this, void 0, void 0, function* () {
        const app = (0, express_1.default)();
        const httpServer = http_1.default.createServer(app);
        const server = new apollo_server_express_1.ApolloServer({
            typeDefs,
            resolvers,
            cache: "bounded",
            csrfPrevention: true,
            plugins: [
                (0, apollo_server_core_1.ApolloServerPluginDrainHttpServer)({ httpServer }),
                (0, apollo_server_core_1.ApolloServerPluginLandingPageLocalDefault)({ embed: true }),
                (0, apollo_server_core_1.ApolloServerPluginInlineTraceDisabled)(),
            ],
            context: ({ req, res }) => {
                const token = cookie_1.default.parse(req.headers.cookie || "").newToken;
                const user = (token ? jsonwebtoken_1.default.verify(token, jwt_key) : null);
                return {
                    prisma: exports.prisma,
                    user,
                    req,
                    res
                };
            }
        });
        yield server.start();
        app.use((0, cors_1.default)());
        server.applyMiddleware({ app, path: "/" });
        yield new Promise(resolve => httpServer.listen({ port: 5000 }, resolve));
        console.log(`🚀 Server ready at http://localhost:5000${server.graphqlPath}`);
    });
}
startApolloServer({ typeDefs: schema_1.typeDefs, resolvers }).then(() => __awaiter(void 0, void 0, void 0, function* () {
    yield exports.prisma.$disconnect();
})).catch((e) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(e);
    yield exports.prisma.$disconnect();
    process.exit(1);
}));
//# sourceMappingURL=index.js.map