# Docker file for development local environment

# How to use environment variables here?
# syntax: --> $PORT

FROM node:8.6.0-alpine

LABEL maintainer="EJMason <eliotjunior@gmail.com>"

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

RUN mkdir -p /opt/app

ARG PORT=3000
ENV PORT $PORT

EXPOSE 3000 5858 9229

# check every 30s to ensure this service returns HTTP 200
HEALTHCHECK CMD curl -fs http://localhost:$PORT/healthz || exit 1

# install dependencies first, in a different location for easier app bind mounting for local development
WORKDIR /opt
COPY package.json /opt
# RUN npm install && npm cache clean --force
RUN yarn && yarn cache clean --force
ENV PATH /opt/node_modules/.bin:$PATH

# copy in our source code last, as it changes the most
WORKDIR /opt/app
COPY . /opt/app

# if you want to use npm start instead, then use `docker run --init in production`
# so that signals are passed properly. Note the code in index.js is needed to catch Docker signals
# using node here is still more graceful stopping then npm with --init afaik
# I still can't come up with a good production way to run with npm and graceful shutdown
CMD [ "node", "./src/app.js" ]
# CMD [ "node", "./watcher.js" ]

# ENTRYPOINT [ "node", "./src/app.js" ]

# _____________ HERE IS THE COMMAND __________________ #
# docker build --file="./.docker/node-dev.dockerfile" --tag ejmason/node .
# docker run -d -p 1337:3000 ejmason/node
#
# -d | daemon mode

# __________________ NOTES _______________________ #


# REMEMBER: Make sure to start docker machine
# docker-machine start
# This will start the virtual box on the os

# docker ps -a
# list the containers

# ----------- Docker Container Network (Communicate) ------------ #
#
# 1. create a custom network --> docker network create --driver bridge <network name>
# 2. run a container in the isolated network --> docker run -d --net=<network name> --name [mongodb] [mongo]
#
#      -------- Commands --------
# docker network create --driver bridge <net name>
# docker run -d --net=<net name> --name mongodb mongo
# docker run -d --net=<net name> --name nodeApp -p 1337:3000 ejmason/node
#
# docker network inspect <net name>    // this gives important info
#
#docker exec <container name> <script>
# -------- end