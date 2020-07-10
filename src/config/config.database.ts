import {MongoConnectionOptions} from "typeorm/driver/mongodb/MongoConnectionOptions";
                                     'typeorm/driver/mongodb/MongoConnectionOptions'
export default {
    clients: [{
        type: 'mongodb',
        name: 'mongodb',
        host: '203.195.148.136',
        port: 32803,
        username: 'admin',
        password: 'liyu123456!',
        authSource: 'admin',
        database: 'zenServer',
        entities: ['app/entities/mongodb/**/*.{ts,js}'],
        useNewUrlParser: true,
        useUnifiedTopology: true,
    } as MongoConnectionOptions,
    ],
};
