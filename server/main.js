_ = lodash;
console.log( 'Running on Environment:\n',
             `\tRoot URL: ${ process.env.ROOT_URL }\n`,
             `\tMongo URL: ${ process.env.MONGO_URL }\n`,
             `\tMongo OPLOG URL: ${ process.env.MONGO_OPLOG_URL }\n` );

import './poll';
