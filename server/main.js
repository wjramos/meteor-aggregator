process.env.DISABLE_WEBSOCKETS = 1;
process.env.NODE_ENV = 'production';

_ = lodash;

console.log( 'Running on Environment:\n',
             `\tRoot URL: ${ process.env.ROOT_URL }\n`,
             `\tMongo URL: ${ process.env.MONGO_URL }\n`,
             `\tMongo OPLOG URL: ${ process.env.MONGO_OPLOG_URL }\n` );

import './poll';
