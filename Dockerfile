FROM node:18-alpine
WORKDIR /usr/src/app
COPY package*.json ./
COPY . .
RUN yarn
EXPOSE 8080
CMD ["yarn", "start"]