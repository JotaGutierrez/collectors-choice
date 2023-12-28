FROM node:18

WORKDIR /home/node
USER node

RUN npm install yarn

WORKDIR /home/node/src/App/UI/Next

EXPOSE 3000

CMD ["yarn", "dev"]
