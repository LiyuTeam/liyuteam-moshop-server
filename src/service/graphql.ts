import {Application, provide, inject, config, Context} from 'midway';
import {GraphQLSchema} from 'graphql';
import path from 'path';
import {buildSchema} from 'type-graphql';
import {ApolloServer} from 'apollo-server-koa/dist/ApolloServer';

export const SYMBOL = Symbol('eggTsGraphql');

/**
 * GraphqlService
 * @description 用于扫描 app/graphql/schema中到***Resolve.ts 生成graphqlSchema Json
 */
@provide('GraphqlService')
class GraphqlService {
    @inject() readonly appDir: string;
    @inject() ctx: Context
    @config('graphql') config: Partial<GraphQLConfig>

    private _symbol: Symbol;
    private _server: ApolloServer;
    public graphqlSchema: GraphQLSchema;
    private _app: Application;

    get symbol(): Symbol {
        return this._symbol;
    }

    set symbol(value: Symbol) {
        this._symbol = value;
    }


    constructor() {
        this._symbol = SYMBOL
    }

    getResolvers(): [string] {
        const isLocal = this._app.env === 'local';
        return [path.resolve(this.appDir, `/graphql/schema/**/*Resolver.${isLocal ? 'ts' : 'js'}`)];
    }

    /**
     * 启动 Graphql 服务
     * @param app Application
     */
    async start(app: any) {
        this._app = app;
        try {
            this.graphqlSchema = await buildSchema({
                resolvers: this.getResolvers(),
                dateScalarMode: 'timestamp',
                // automatically create `schema.gql` file with schema definition in project's working directory
                emitSchemaFile: {
                    // path: 'app/../schema.gql',
                    path: path.join('src', 'app', 'public', 'graphql', 'AllSchema.graphql'),
                    commentDescriptions: true,
                    sortedSchema: false, // by default the printed schema is sorted alphabetically
                },
            });
        } catch (e) {
            console.trace(e);
        }

        this._server = new ApolloServer({
            schema: this.graphqlSchema,
            tracing: true,
            context: ({ctx}) => ctx, // 将 egg 的 context 作为 Resolver 传递的上下文
            playground: {
                settings: {
                    'request.credentials': 'include',
                },
            } as any,
            introspection: true,
        });
        this._server.applyMiddleware({
            app: app,
            // app:  app.getApplicationContext().,
            path: this.config.router,
            cors: true,
        });

        console.info('graphql server init', this.config.router, 7002);

        return this;
    }

    // async query({query, var})

    get schema(): GraphQLSchema {
        return this.graphqlSchema;
    }

}

export default GraphqlService