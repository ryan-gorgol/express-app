FROM node:16-alpine
WORKDIR /app
COPY package.json . 
RUN npm install

RUN if [ "$NODE_ENV" = "development" ]; \
  then npm install; \
  else npm install --only=production; \
  fi

COPY . ./
ENV PORT 3000
EXPOSE $PORT
# CMD ["node", "index.js"]
CMD ["docker-compose", "-f", "docker-compose.yml", "-f",  "docker-compose.dev.yml", "up", "-d"]