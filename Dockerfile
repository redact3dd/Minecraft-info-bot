FROM alpine:3.18 AS builder

RUN apk --no-cache add npm

RUN adduser -D app
USER app

COPY --chown=app package*.json /app/

WORKDIR /app

RUN npm ci



FROM node:current-alpine3.18

RUN adduser -D app
USER app

COPY --chown=app package*.json /app/

WORKDIR /app

COPY --from=builder --chown=app /app/node_modules node_modules

COPY --chown=app dist/ /app/dist/

ENV DISCORD_TOKEN= DISCORD_CLIENTID=

VOLUME /app/data

CMD ["node", "."]