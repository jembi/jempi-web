# Build Production version in Node
FROM node:16-alpine as build

WORKDIR /app

COPY . .

RUN yarn install

RUN yarn build

# Serve built project with nginx
FROM nginx:mainline-alpine

WORKDIR /usr/share/nginx/html

COPY --from=build /app/build  ./
