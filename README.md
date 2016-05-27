# Meteor Content Aggregator

### How to use:
1. Install [Meteor](https://www.meteor.com/install)
1. Run `meteor` inside of app directory

You are now running a meteor app -- accessible at `localhost:3000`

### Project Structure:
- client ( runs only on the client )
 - js ( browser scripts )
 - stylesheets ( bundled less )
 - views ( react views )

- server ( runs only on the server )

- imports ( modules that can be loaded either client or server, not engaged unless required )

- public ( static assets )

- config ( module configurations )

### Features
- Replacement of underscore with [Lodash](https://atmospherejs.com/stevezhu/lodash)
- On-the-fly Less compilation with [Less](https://atmospherejs.com/grove/less)
- Validated data storage with [Collection2](https://atmospherejs.com/aldeed/collection2)
- Routing path resolution with [Flow Router](https://atmospherejs.com/meteorhacks/flowrouter)
- Back-end rendering with [Fast-Render](https://atmospherejs.com/meteorhacks/fast-render) [(coupled with flow-router)](https://github.com/kadirahq/flow-router#fast-render)
- Subscription caching with [Subs Manager](https://atmospherejs.com/meteorhacks/subs-manager)
- Performance monitoring with [Kadira](https://atmospherejs.com/meteorhacks/kadira)


### Bundling
```
meteor build ../build && cd ../build && tar -zxvf united-outside.tar.gz && cd bundle && touch Dockerfile
```



### Deployments
https://github.com/chriswessels/meteor-tupperware

#### Building
```
docker build -t rapd/united-outside .
```

#### Running
```
docker run -rm \
    -e ROOT_URL=http://localhost/ \
    -e MONGO_URL=mongodb://127.0.0.1 \
    -e MONGO_OPLOG_URL=mongodb://127.0.0.1/local\
    -p 8080:80\
    rapd/united-outside
```

#### Deploying
```
docker push rapd/united-outside
```
