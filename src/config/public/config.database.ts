import { MongoConnectionOptions } from 'typeorm/driver/mongodb/MongoConnectionOptions'
import { EggAppInfo } from 'midway'

export default (appInfo: EggAppInfo) => ({
    clients: [{
        type: 'mongodb' ,
        name: 'mongodb' ,
        host: '203.195.148.136' ,
        port: 32803 ,
        username: 'admin' ,
        password: 'liyu123456!' ,
        authSource: 'admin' ,
        database: 'zenServer' ,
        entities: ['src/app/model/entities/mongodb/**/*.{ts,js}'] ,
        useNewUrlParser: true ,
        useUnifiedTopology: true ,
        synchronize: true   //  强制同步
    } as MongoConnectionOptions
    ]
})
