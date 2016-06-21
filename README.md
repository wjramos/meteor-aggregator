# United Outside ( Meteor Content Aggregator ) ![Build Status](https://travis-ci.org/rei/united-outside.svg)

### How to use:
1. Install [Meteor](https://www.meteor.com/install) `curl https://install.meteor.com/ | sh`
1. Clone repository `git clone https://github.com/rei/united-outside.git; cd united-outside`
1. Run `meteor npm install; meteor` inside of app directory

You are now running a meteor app – accessible at `localhost:3000`

### Project Structure:
```
- client       ( runs only on the client )
 - js          ( browser scripts )
 - stylesheets ( bundled less )
- server       ( runs only on the server )
- app          ( runs on both client and server )
 - components  ( stateless presentational components )
 - containers  ( component-data composition and stateful components )
 - layouts     ( arrangement )
 - render.js   ( render app per route )
- imports      ( modules that can be loaded either client or server, not engaged unless required )
- lib          ( always-loaded utilities )
- config       ( module configurations )
```

### Features
- Replacement of underscore with [Lodash](https://atmospherejs.com/stevezhu/lodash)
- On-the-fly Less compilation with [Less](https://atmospherejs.com/grove/less)
- Validated data storage with [Collection2](https://atmospherejs.com/aldeed/collection2)
- Routing path resolution and Server-Side Rendering with [Flow Router SSR](https://atmospherejs.com/meteorhacks/flowrouter-ssr)
- Data pre-rendering with [Fast-Render](https://atmospherejs.com/meteorhacks/fast-render) [(coupled with flow-router)](https://github.com/kadirahq/flow-router#fast-render)
- ( WIP ) Subscription caching with [Subs Manager](https://atmospherejs.com/meteorhacks/subs-manager)
- Performance monitoring with [Kadira](https://atmospherejs.com/meteorhacks/kadira)


### Docker
[Base image](https://github.com/meteorhacks/meteord)

#### Build
```
docker build -t rapd/united-outside .
```

#### Run
```
docker-compose up
```

App should be running at `127.0.0.1`
