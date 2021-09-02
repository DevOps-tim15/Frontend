FROM node:14.17.5-alpine
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 4200
CMD node_modules/.bin/ng serve --host 0.0.0.0