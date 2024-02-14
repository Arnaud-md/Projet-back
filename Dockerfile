FROM node:18-alpine
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
EXPOSE 3030
RUN npx tsc
CMD node dist/index.js