# Docker file for development local environment

# How to use environment variables here?
# syntax: --> $PORT

FROM node:latest

LABEL maintainer="EJMason <eliotjunior@gmail.com>"

COPY . /var/www

WORKDIR /var/www
RUN yarn

# What happens if I don't have a volume
# Test this out with log files
# "This means the docker HOST is where the source code lives..."
# VOLUME [ "/var/www" ]
# the volume throws an error just like this...

# This isn't the outside port. This is where the node app will listen
EXPOSE 3000

ENV NODE_ENV=development

ENTRYPOINT [ "yarn", "run", "docker:dev" ]

# _____________ HERE IS THE COMMAND __________________ #
# docker build --file="./.docker/node-dev.dockerfile" --tag ejmason/node .
# docker run -d -p 1337:3000 ejmason/node
#
# -d is daemon mode, this has it run in the background

# __________________ NOTES _______________________ #


# REMEMBER: Make sure to start docker machine
# docker-machine start
# This will start the virtual box on the os

# docker ps -a
# list the containers


#end