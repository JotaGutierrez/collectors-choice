FROM node:18 as dev

USER 1000:1000

WORKDIR /home/node

RUN npm install yarn

WORKDIR /home/node/src/App/UI/Next

EXPOSE 3000

CMD ["yarn", "dev"]


FROM node:18 AS install-deps

WORKDIR /home/node/src/App/UI/Next

COPY ./src/App/UI/Next/package.json ./src/App/UI/Next/yarn.lock ./

RUN yarn install --frozen-lockfile


FROM node:18 AS build

WORKDIR /home/node
COPY ./src/App ./src/App
COPY ./src/Core ./src/Core

WORKDIR /home/node/src/App/UI/Next

COPY --from=install-deps /home/node/src/App/UI/Next/node_modules ./node_modules

RUN yarn build


FROM build AS prod

ENV NODE_ENV production
WORKDIR /home/node

COPY --from=build . .

EXPOSE 3000

ENV PORT 3000

WORKDIR /home/node/src/App/UI/Next

CMD ["node", "server.js"]
