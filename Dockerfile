FROM node:20 AS build-env
COPY . /app
WORKDIR /app

RUN npm install --only=prod

FROM gcr.io/distroless/nodejs20-debian11
COPY --from=build-env /app /app
WORKDIR /app
CMD ["BackEnd/server.js"]