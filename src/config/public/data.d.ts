interface GraphQLConfig {
    router: string,
    // 是否加载到 app 上，默认开启
    app: boolean,
    // 是否加载到 agent 上，默认关闭
    agent: boolean,
    // 是否加载开发者工具 graphiql, 默认开启。路由同 router 字段。使用浏览器打开该可见。
    graphiql: boolean,
    // 是否设置默认的Query和Mutation, 默认关闭
    defaultEmptySchema: boolean,
    cors: {
        origin: string,
        allowMethods: string,
    },
}
