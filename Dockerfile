FROM node:20-alpine

WORKDIR /app

RUN apk add --no-cache dumb-init

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

EXPOSE 5173

ENTRYPOINT ["dumb-init", "--"]
CMD ["npm", "run", "dev:docker"]
