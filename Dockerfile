# METEORD
## Production
# FROM meteorhacks/meteord:onbuild

## Dev
FROM meteorhacks/meteord:devbuild


# TUPPERWARE
# Generated by meteor-tupperware quickstart script 0.1.2
# https://github.com/chriswessels/meteor-tupperware

# Inherit from chriswessels/meteor-tupperware image
# FROM quay.io/chriswessels/meteor-tupperware

# The maintainer of your app image
# MAINTAINER Darth Vader <darth@thedeathstar.io>

# (optional) Bake runtime options into your image
ENV ROOT_URL="http://localhost"
ENV PORT="3000"
ENV MONGO_URL="mongodb://127.0.0.1:3001/meteor"
ENV MONGO_OPLOG_URL="mongodb://127.0.0.1:3001/local"

CMD [ "meteor npm install" ]
