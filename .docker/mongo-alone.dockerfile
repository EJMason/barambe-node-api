# MongoDb
# This is a standalone db that app can connect to locally
# The port is exposed, DO NOT USE FOR PRODUCTION...


# https://github.com/docker-library/mongo/blob/18081c4daf5ecf72beee4a77343e961e6cf38ecd/3.4/Dockerfile
FROM mongo:3.4.9-jessie
# this creates dir /data/db
# exposes default port 27017

LABEL maintainer="EJMason <eliotjunior@gmail.com>"

# create a location for mongo scripts
RUN mkdir /var/www
RUN mkdir /var/www/dbScriptsc

# redundant?
# EXPOSE 27017

# docker build --file="./.docker/mongo-alone.dockerfile" --tag ejmason/mongo-alone .
# docker run -d -p 2727:27017 ejmason/mongo-alone
#
# docker attatch <id or name>