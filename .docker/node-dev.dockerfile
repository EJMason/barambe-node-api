# Docker file for development local environment

# How to use environment variables here?

FROM node:8.6.0-alpine

LABEL maintainer="EJMason <eliotjunior@gmail.com>"

ARG NODE_ENV=development
ARG PORT=3000

ENV NODE_ENV=${NODE_ENV}
ENV PORT $PORT

RUN mkdir -p /opt/app

EXPOSE 3000 5858 9229

HEALTHCHECK --interval=10s CMD curl http://localhost:$PORT/healthz || exit 1

WORKDIR /opt
COPY package.json /opt

RUN yarn && yarn cache clean --force
ENV PATH /opt/node_modules/.bin:$PATH


WORKDIR /opt/app
COPY . /opt/app

CMD [ "node", "./src/app.js" ]

# __________________ NOTES _______________________ #



# -------- end