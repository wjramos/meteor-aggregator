# United Outside ( Meteor Content Aggregator ) ![Build Status](https://travis-ci.org/rei/united-outside.svg)

### How to use:
1. Install [Meteor](https://www.meteor.com/install)
1. Run `meteor` inside of app directory

You are now running a meteor app -- accessible at `localhost:3000`

### Structure:
- client ( runs only on the client )
 - js ( browser scripts )
 - stylesheets ( bundled less )
 - views ( react views )

- server ( runs only on the server )

- imports ( modules that can be loaded either client or server, not engaged unless required )

- public ( static assets )

- config ( module configurations )


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
