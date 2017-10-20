

FROM mongo:3.4.9-jessie

LABEL maintainer="EJMason <eliotjunior@gmail.com>"

EXPOSE 27017

# I can still connect to this db locally.
# Probably want to eventually secure this.