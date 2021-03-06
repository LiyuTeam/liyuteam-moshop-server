# MoShop - Server
MoShop服务端
当前版本`v0.0.3`

应用于通过快速配置生成小程序代码,并进行发布迭代;
采用阿里体系的Midway中途岛框架开发;

> 目录
>
> [功能开发](#功能开发)
> [架构描述](#架构描述)


## <span id="功能开发">功能开发</span>

> 进行
- [ ] 通用模块开发(数据字典\日志管理)

> 计划
- [ ] 小程序对接模块 - moapp 开发
- [ ] 业务模块 - cms 开发
- [ ] PgSql集成
- [ ] Redis集成
- [ ] CI自动打包,Docker自动化发布

> 完成

`2020-07-22` - `v0.0.3`
- [x] TypeOrm集成
- [x] PgSql集成
- [x] Typeorm + TypeGraphql + Midway (TTM) 开发规范


`2020-07-13` - `v0.0.2`
- [x] Egg TsHelper集成
- [x] Graphql,TypeGraphql,ApolloServer集成

`2020-07-03` - `v0.0.1`
- [x] 框架初始化,部署初始化

## <span id="架构描述">架构描述</span>

### 系统集成
- [x] Graphql
- [x] Typeorm
- [x] TypeGraphql
- [x] Mongodb

### 底层框架 - midway

感谢midway以及ykfe提供到底层脚手架;

> Egg + React + SSR 应用骨架

详细用法实现请查看[官方文档](http://ykfe.surge.sh)

> 功能/特性

- [x] 基于 cra 脚手架开发，由 cra 开发的 React App 可无缝迁移，如果你熟悉 cra 的配置，上手成本几乎为 0
- [x] 小而美，相比于 beidou，next.js 这样的高度封装方案，我们的实现原理和开发模式一目了然
- [x] 推荐使用 egg 作为 Node.js 框架但并不强制，事实上你可以发现几乎无需做任何修改即可迁移到 koa,nest.js 等框架
- [x] 同时支持 SSR 以及 CSR 两种开发模式,本地开发环境以及线上环境皆可无缝切换两种渲染模式
- [x] 统一前端路由与服务端路由，无需重复编写路由文件配置
- [x] 支持切换路由时自动获取数据
- [x] 支持本地开发 HMR
- [x] 稳定性经过线上大规模应用验证，可提供性能优化方案
- [x] 支持 tree shaking，优化构建 bundle 大小以及数量
- [x] 支持 csr/ssr 自定义 layout，无需通过 path 来手动区分
- [x] 抛弃传统模版引擎，拥抱 React 组件，使用 JSX 来作为模版
- [x] 独创[最佳发布实践](http://ykfe.surge.sh/guide/deploy.html)，让你更新页面无需重启应用机器
- [x] 配套结合[antd](https://github.com/ykfe/egg-react-ssr/tree/master/example/ssr-with-antd)的 example 的实现
- [x] 配套结合[react-loadable](https://github.com/ykfe/egg-react-ssr/tree/master/example/ssr-with-loadable)做路由分割的 example 的实现
- [x] 配套结合[dva](https://github.com/ykfe/egg-react-ssr/tree/master/example/ssr-with-dva)做数据管理的 example 的实现
- [x] 配套阿里云 serverless [FC](https://github.com/ykfe/ssr-with-fc)版本的实现
- [x] 配套[TypeScript](https://github.com/ykfe/egg-react-ssr/tree/dev/example/ssr-with-ts)版本的实现
