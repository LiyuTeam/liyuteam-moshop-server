import {EggAppInfo, PowerPartial} from "midway";
import createQueryComplexityValidator, {simpleEstimator} from "graphql-query-complexity";
import {GraphQLError} from "graphql";

export default (appInfo: EggAppInfo) => {
    return {
        router: '/graphql',
        // 是否加载到 app 上，默认开启
        app: true,
        // 是否加载到 agent 上，默认关闭
        agent: true,
        // 是否加载开发者工具 graphiql, 默认开启。路由同 router 字段。使用浏览器打开该可见。
        graphiql: true,
        // 是否设置默认的Query和Mutation, 默认关闭
        defaultEmptySchema: false,
        // graphQL 路由前的拦截器
        // * onPreGraphQL(ctx) {
        // },
        // 开发工具 graphiQL 路由前的拦截器，建议用于做权限操作(如只提供开发者使用)
        // * onPreGraphiQL(ctx) {
        // },
        // apollo server的透传参数，参考[文档](https://www.apollographql.com/docs/apollo-server/api/apollo-server/#parameters)
        // apolloServerOptions: {
        //     //   rootValue,
        //     //   formatError,
        //     //   formatResponse,
        //     //   mocks,
        //     //   schemaDirectives,
        //     //   introspection,
        //     //   playground,
        //     //   debug,
        //     //   validationRules,
        //     //   tracing,
        //     //   cacheControl,
        //     //   subscriptions,
        //     //   engine,
        //     //   persistedQueries,
        // },
        cors: {
            origin: '*',
            allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
        },
        queryComplexity: createQueryComplexityValidator({
            // The maximum allowed query complexity, queries above this threshold will be rejected
            maximumComplexity: 1000,

            // The query variables. This is needed because the variables are not available
            // in the visitor of the graphql-js library
            variables: {},

            // Optional callback function to retrieve the determined query complexity
            // Will be invoked whether the query is rejected or not
            // This can be used for logging or to implement rate limiting
            onComplete: (complexity: number) => {
                console.log('Determined query complexity: ', complexity)
            },

            // Optional function to create a custom error
            createError: (max: number, actual: number) => {
                return new GraphQLError(`Query is too complex: ${actual}. Maximum allowed complexity: ${max}`);
            },

            // Add any number of estimators. The estimators are invoked in order, the first
            // numeric value that is being returned by an estimator is used as the field complexity.
            // If no estimator returns a value, an exception is raised.
            estimators: [
                // Add more estimators here...

                // This will assign each field a complexity of 1 if no other estimator
                // returned a value.
                simpleEstimator({
                    defaultComplexity: 1
                })
            ]
        })
    } as PowerPartial<GraphQLConfig>
}