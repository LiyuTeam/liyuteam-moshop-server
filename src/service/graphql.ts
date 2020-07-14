import {Application, provide, inject, config, Context, ScopeEnum, scope, logger, providerWrapper} from "midway";
import {GraphQLSchema} from "graphql";
import path from "path";
import {buildSchema} from "type-graphql";
import {ApolloServer} from "apollo-server-koa/dist/ApolloServer";
import {GraphQLConfigType} from "../config";
import {IGraphqlService} from "../interface";


/**
 * GraphqlService
 * @description 用于扫描 app/graphql/schema中到***Resolve.ts 生成graphqlSchema Json
 */
@scope(ScopeEnum.Singleton)
@provide()
class GraphqlService implements IGraphqlService {

    app: Application;
    symbol: Symbol

    @inject()
    readonly appBoot: Application;

    @inject()
    readonly appDir: string;

    @inject()
    readonly ctx: Context;

    @config("graphql")
    readonly config: Partial<GraphQLConfigType>;

    @logger()
    readonly logger: any;

    public apolloServer: ApolloServer;
    public graphqlSchema: GraphQLSchema;

    getResolvers(): [string] {
        const isLocal = this.app.config.env === "local";
        return [path.resolve(this.appDir, `/model/**/*.${isLocal ? "ts" : "js"}`)];
    }

    /**
     * 启动 Graphql 服务
     * @param app Application
     */
    async start(app: any) {
        this.app = app;

        this.logger.log(this, this.app, this.appBoot);

        try {
            this.graphqlSchema = await buildSchema({
                nullableByDefault: true,
                resolvers: this.getResolvers(),
                dateScalarMode: "timestamp",
                // automatically create `schema.gql` file with schema definition in project's working directory
                emitSchemaFile: {
                    // path: 'app/../schema.gql',
                    path: path.join(
                        this.appDir,
                        "public",
                        "graphql",
                        "AllSchema.graphql"
                    ),
                    commentDescriptions: true,
                    sortedSchema: false // by default the printed schema is sorted alphabetically
                }
            });
        } catch (e) {
            console.trace(e);
        }


        this.apolloServer = new ApolloServer({
            schema: this.graphqlSchema,
            tracing: true,
            context: ({ctx}) => ctx, // 将 egg 的 context 作为 Resolver 传递的上下文
            playground: {
                settings: {
                    "request.credentials": "include"
                }
            } as any,
            introspection: true
        });

        this.apolloServer.applyMiddleware({
            app: app,
            // app:  app.getApplicationContext().,
            path: this.config.router,
            cors: true
        });


        console.info("graphql server init", this.config.router, 7001);
    }

    // async query({query, var})

    get schema(): GraphQLSchema {
        return this.graphqlSchema;
    }


}

export default GraphqlService;


export function apolloHandler(context) {
    return async () => {
        const graphqlService: GraphqlService = await context.getAsync('graphqlService');

        try {
            let graphqlSchema = await buildSchema({
                nullableByDefault: true,
                resolvers: graphqlService.getResolvers(),
                dateScalarMode: "timestamp",
                // automatically create `schema.gql` file with schema definition in project's working directory
                emitSchemaFile: {
                    // path: 'app/../schema.gql',
                    path: path.join(
                        await context.getAsync('appDir'),
                        "public",
                        "graphql",
                        "AllSchema.graphql"
                    ),
                    commentDescriptions: true,
                    sortedSchema: false // by default the printed schema is sorted alphabetically
                }
            });

            let apolloServer = new ApolloServer({
                schema: graphqlSchema,
                tracing: true,
                context: ({ctx}) => ctx, // 将 egg 的 context 作为 Resolver 传递的上下文
                playground: {
                    settings: {
                        "request.credentials": "include"
                    }
                } as any,
                introspection: true
            });

            apolloServer.applyMiddleware({
                app: await context.getAsync('appBoot'),
                // app:  app.getApplicationContext().,
                path: graphqlService.config.router,
                cors: true
            });

            return apolloServer
        } catch (e) {
            console.trace(e);
        }
    }
}


providerWrapper([
    {
        id: "apolloServer",
        provider: apolloHandler
    }
])